import { useState } from 'react'
import clsx from 'clsx'
import { GoHome } from 'react-icons/go'
import { RiMovie2Line } from 'react-icons/ri'
import { HiMenu, HiSearch, HiX } from 'react-icons/hi'
import LinkWithRef from '@/components/LinkWithRef'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Navbar = ({
  open,
  setOpen
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const router = useRouter()
  const [x, setX] = useState(false)

  //pages
  const pages = [
    {
      name: 'Home',
      href: '/',
      icon: <GoHome className="w-auto h-6 z-[1] relative" />
    },
    {
      name: 'Discover',
      href: '/discover',
      icon: <RiMovie2Line className="w-auto h-6 z-[1] relative" />
    },
    {
      name: 'Search',
      href: '/search',
      icon: <HiSearch className="w-auto h-6 z-[1] relative" />
    }
  ]

  return (
    <>
      <button
        type="button"
        className={clsx(
          'fixed bottom-6 md:bottom-10 right-6 md:right-10 text-white z-[5] bg-neutral-900 overflow-hidden grid place-content-center grid-cols-1 grid-rows-1 h-10 w-10 rounded-full transform transition-all duration-300'
        )}
        onClick={() => setX(!x)}
      >
        <HiX
          className={clsx(
            'w-auto h-6 top-1/2 -translate-y-1/2 absolute transition-all duration-300',
            {
              '-left-[150%] scale-0': !x,
              '-translate-x-1/2 left-1/2': x
            }
          )}
        />
        <HiMenu
          className={clsx(
            'w-auto h-6 top-1/2 -translate-y-1/2 absolute transition-all duration-300',
            {
              'left-[150%] scale-0': x,
              '-translate-x-1/2 left-1/2': !x
            }
          )}
        />
      </button>
      {/* close navbar */}
      <button
        tabIndex={-5}
        className={clsx('fixed inset-0 w-full block bg-yellow-400/20 z-[3]', {
          hidden: !x
        })}
        onClick={() => setX(false)}
      />
      <nav
        className={clsx(
          'fixed inset-y-0 left-0 px-2 z-[4] pt-32 text-white bg-neutral-800/50  transform transition-all duration-300',
          { '-translate-x-full motion-reduce:-scale-x-50': !x }
        )}
      >
        <div className="flex flex-col items-center justify-start space-y-12">
          {pages.map((tab: any, i: number) => {
            if (tab?.name === 'Search') {
              return (
                <button
                  key={i}
                  type="button"
                  className="h-9 w-9 grid place-content-center"
                  onClick={() => setOpen(!open)}
                >
                  {tab?.icon}
                </button>
              )
            }
            return (
              <LinkWithRef
                key={i}
                href={tab?.href}
                className={clsx(
                  'relative h-9 w-9 grid place-content-center',
                  (router.pathname === tab?.href ||
                    router.pathname.split('/')[1] ===
                      tab?.href?.split('/')[1]) &&
                    'text-white'
                )}
              >
                {(router.pathname === tab?.href ||
                  router.pathname.split('/')[1] ===
                    tab?.href?.split('/')[1]) && (
                  <motion.div
                    layoutId="highlight"
                    className={clsx(
                      'absolute inset-0 bg-neutral-900 rounded-md'
                    )}
                  />
                )}
                {tab?.icon}
              </LinkWithRef>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Navbar
