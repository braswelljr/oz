import { useState } from 'react'
import clsx from 'clsx'
// import { IoMdFilm } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { RiMovie2Line } from 'react-icons/ri'
// import { MdOndemandVideo } from 'react-icons/md'
import { HiMenu } from 'react-icons/hi'
import LinkWithRef from '@/components/LinkWithRef'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Navbar = () => {
  const router = useRouter()
  const [x, setX] = useState(false)

  //pages
  const pages = [
    {
      name: '',
      href: '/',
      icon: <GoHome className="w-auto h-6 z-[1] relative" />
    },
    {
      name: '',
      href: '/discover',
      icon: <RiMovie2Line className="w-auto h-6 z-[1] relative" />
    }
    // { name: '', href: '/', icon: <IoMdFilm className="w-auto h-8" /> },
    // {
    //   name: '',
    //   href: '/',
    //   icon: <MdOndemandVideo className="w-auto h-8" />
    // }
  ]

  return (
    <>
      <button
        type="button"
        className={clsx(
          'fixed top-3 left-4 text-white z-[5] bg-gray-800 bg-opacity-70 p-2 rounded-full transform transition-all duration-300',
          { 'rotate-90': x }
        )}
        onClick={() => setX(!x)}
      >
        <HiMenu className="w-auto h-7 " />
      </button>
      <nav
        className={clsx(
          'fixed inset-y-0 left-0 px-4 z-[3] pt-32 text-white bg-gray-800 bg-opacity-30  transform transition-all duration-300',
          { '-translate-x-full': !x }
        )}
      >
        <div className="flex flex-col items-center justify-start space-y-12">
          {pages.map((tab: any, i: number) => {
            return (
              <LinkWithRef
                key={i}
                href={tab?.href}
                className={clsx(
                  'relative h-9 w-9 grid place-content-center',
                  (router.pathname === tab?.href ||
                    router.pathname.split('/')[1] ===
                      tab?.href?.split('/')[1]) &&
                    'text-gray-800'
                )}
              >
                {(router.pathname === tab?.href ||
                  router.pathname.split('/')[1] ===
                    tab?.href?.split('/')[1]) && (
                  <motion.div
                    layoutId="highlight"
                    className={clsx(
                      'absolute inset-0 bg-yellow-300 rounded-md'
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
