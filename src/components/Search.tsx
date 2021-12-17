import { useState, useRef, useEffect } from 'react'
import { HiSearch, HiStar } from 'react-icons/hi'
import clsx from 'clsx'
import useSWR from 'swr'
import { search, image as imageUrl } from '@/configs/urls'
import LinkWithRef from '@/components/LinkWithRef'
import Image from 'next/image'
import Tabs from '@/components/Tabs'
import { GoGlobe } from 'react-icons/go'
import { MdOndemandVideo } from 'react-icons/md'
import { IoIosPeople } from 'react-icons/io'

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchCloseRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [mediaType, setMediaType] = useState('multi')

  // set focus action
  useEffect(() => {
    if (!open) searchInputRef?.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '/') {
        return
      }
      e.preventDefault()
      setOpen(false)
      searchInputRef?.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open === true) {
      document.body.style.overflowY = 'auto'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflowY = 'hidden'
      document.body.style.height = '100vh'
    }
  }, [open])

  useEffect(() => {
    function onKeyClose(e: KeyboardEvent) {
      if (e.key !== 'Escape') {
        return
      }
      e.preventDefault()
      searchCloseRef?.current?.click()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [])

  const { data, error } = useSWR(
    searchQuery.length > 0
      ? [
          `${search}/${mediaType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}&include_adult=true`,
          searchQuery,
          mediaType
        ]
      : '',
    (url: string) => fetch(url).then(res => res.json()),
    { shouldRetryOnError: true }
  )

  useEffect(() => {
    data !== undefined ? setSearchResult(data?.results ?? []) : undefined
    if (searchQuery.length < 1) setSearchResult([])
  }, [data, error, searchQuery, mediaType])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 flex justify-end items-center px-4 py-3 text-neutral-400 bg-transparent z-[5] md:px-10 lg:px-20 xl:px-30">
        <div className="flex space-x-6 font-bold">
          <button
            type="button"
            className="fixed top-3 right-3 text-white z-[5] bg-neutral-800 bg-opacity-80 p-1 rounded transform transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            <HiSearch className="w-auto h-6" />
          </button>
        </div>
      </nav>
      <div
        className={clsx(
          'flex fixed inset-x-0 z-10 transform transition-all duration-200 bg-white shadow mx-auto rounded py-1 sm:px-6 lg:px-20 px-4',
          {
            'translate-y-0': !open,
            '-translate-y-full': open
          }
        )}
      >
        <label
          htmlFor="search-input"
          className="flex items-center flex-none pr-3"
        >
          <span className="sr-only">Search movie</span>
          <HiSearch className="w-auto h-5 text-neutral-500 transition-colors duration-150 group-focus-within:text-neutral-600" />
        </label>
        <input
          type="text"
          id="search-input"
          autoComplete="off"
          ref={searchInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={`Search movies, tv shows and actors (Press “ESCAPE” to quit)`}
          className={clsx(
            'w-full py-4 md:text-base text-sm leading-6 placeholder-gray-300 focus:outline-none focus:placeholder-gray-400',
            {}
          )}
        />
        <button
          ref={searchCloseRef}
          type="button"
          className="relative p-1 -ml-6 text-xs font-black text-white bg-neutral-900 rounded focus:outline-none"
          onClick={() => {
            setSearchQuery('')
            setOpen(true)
          }}
        >
          Esc
        </button>
      </div>
      {!open && (
        <>
          <div className="fixed inset-0 md:px-10 lg:px-20 xl:px-30 min-h-[30vh] overflow-y-auto bg-white z-[6] space-y-4 top-0 p-5 pt-[5.5rem]">
            {Array.isArray(searchResult) && searchResult?.length > 0 ? (
              <>
                <div className="fixed inset-x-0 max-w-4xl rounded sm:mx-auto mx-5 bg-stone-200 top-[4.5rem] z-[3]">
                  <Tabs
                    tabs={{
                      multi: (
                        <div className="flex items-center justify-center space-x-2">
                          <GoGlobe className="w-auto h-5" />
                          <span className="hidden md:block">All</span>
                        </div>
                      ),
                      tv: (
                        <div className="flex items-center justify-center space-x-2">
                          <MdOndemandVideo className="w-auto h-5" />
                          <span className="hidden md:block">TV Series</span>
                        </div>
                      ),
                      person: (
                        <div className="flex items-center justify-center space-x-2">
                          <IoIosPeople className="w-auto h-5" />
                          <span className="hidden md:block">Celebs</span>
                        </div>
                      )
                    }}
                    selected={mediaType}
                    onChange={setMediaType}
                    itemClassName={{
                      container: 'bg-neutral-900 text-sm rounded',
                      item: 'px-3 py-1 leading-5 font-semibold',
                      notSelected: 'text-neutral-900'
                    }}
                  />
                </div>
                <div
                  className={clsx(
                    'relative md:px-10 lg:px-20 xl:px-30 divide-y divide-gray-300 bg-white overflow-y-auto'
                  )}
                >
                  {searchResult.map((card: any, i: number) => (
                    <LinkWithRef
                      href={'/'}
                      className={clsx(
                        'flex space-x-2 sm:space-x-4 py-3 px-4 relative'
                      )}
                      key={i}
                    >
                      <div className="relative overflow-hidden z-0 w-[4.5rem] h-28 bg-black rounded">
                        <Image
                          src={`${imageUrl}/original/${
                            card?.poster_path ??
                            card?.poster_path ??
                            card?.profile_path
                          }`}
                          alt={
                            card?.title ?? card?.name ?? card?.original_title
                          }
                          layout="fill"
                          objectFit="cover"
                          className="relative w-24 h-36 aspect-ratio-1/1"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1 w-[70%] sm:w-full grow-0">
                        <div className="space-y-2 text-sm">
                          <h2 className="font-semibold text-gray-900 truncate w-[80%] sm:w-full">
                            {card?.title ?? card?.name ?? card?.original_title}
                          </h2>
                          <div className="flex space-x-2 text-sm text-gray-600 leading-6 font-medium items-center">
                            {card?.media_type !== undefined && (
                              <div className="px-1.5 ring-1 min-w-[2.5rem] text-center py-1 text-xs ring-gray-200 rounded">
                                {card?.media_type}
                              </div>
                            )}
                            <div className="">
                              {(
                                card?.release_date ??
                                card?.first_air_date ??
                                ''
                              ).slice(0, 4)}
                            </div>
                          </div>
                        </div>
                      </div>
                      {card?.vote_average !== undefined &&
                        card?.vote_average > 0 && (
                          <dl className="top-3 absolute right-4 flex items-center text-xs text-gray-600 leading-6 font-medium">
                            <span className="sr-only">Star rating</span>
                            <HiStar className="w-auto h-5 text-amber-400" />
                            <span>{card?.vote_average}</span>
                          </dl>
                        )}
                    </LinkWithRef>
                  ))}
                </div>
              </>
            ) : (
              <div
                className={clsx('fixed inset-0 z-[5] bg-opacity-40')}
                onClick={() => {
                  setOpen(true)
                  setSearchQuery('')
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Search
