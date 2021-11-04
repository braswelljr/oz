import { useState, useRef, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import clsx from 'clsx'

const Search = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchCloseRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // set focus action
  useEffect(() => {
    if (open === false) searchInputRef?.current?.focus()
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
    function onKeyClose(e: KeyboardEvent) {
      if (e.which !== 27) {
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

  return (
    <>
      <nav className="fixed inset-x-0 top-0 flex justify-end items-center px-4 py-3 text-gray-400 bg-transparent z-[5] md:px-10 lg:px-20 xl:px-30">
        <div className="flex space-x-6 font-bold">
          <button
            type="button"
            className="fixed top-3 right-4 text-white z-[5] bg-gray-800 bg-opacity-80 p-2 rounded-full transform transition-all duration-300"
            onClick={() => setOpen(false)}
          >
            <HiSearch className="w-auto h-6" />
          </button>
        </div>
      </nav>
      <div>
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
            <HiSearch className="w-auto h-5 text-gray-500 transition-colors duration-150 group-focus-within:text-gray-600" />
          </label>
          <input
            type="text"
            id="search-input"
            autoComplete="off"
            ref={searchInputRef}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search movies and shows (Press “ESCAPE” to quit)`}
            className={clsx(
              'w-full py-4 md:text-base text-sm leading-6 placeholder-gray-300 focus:outline-none focus:placeholder-gray-400',
              {}
            )}
          />
          <button
            ref={searchCloseRef}
            type="button"
            className="relative p-1 -ml-6 text-xs font-black text-gray-900 bg-yellow-200 rounded focus:outline-none"
            onClick={() => {
              setSearchQuery('')
              setOpen(true)
            }}
          >
            Esc
          </button>
        </div>
      </div>
    </>
  )
}

export default Search
