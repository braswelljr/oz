import { useState, forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { IoMdFilm } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { RiMovie2Line } from 'react-icons/ri'
import { MdOndemandVideo } from 'react-icons/md'
import { HiMenu } from 'react-icons/hi'

type Props = {
  children: ReactNode
  className?: string | undefined
  href?: string | { pathname: string; query: { slug: string } } | undefined
} & LinkProps

const MenuTab = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, href }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
)

const Navbar = () => {
  const [x, setX] = useState(false)

  //
  const pages = [
    { name: '', href: '/', icon: <GoHome className="w-auto h-8" /> },
    {
      name: '',
      href: '/',
      icon: <RiMovie2Line className="w-auto h-8" />
    },
    { name: '', href: '/', icon: <IoMdFilm className="w-auto h-8" /> },
    {
      name: '',
      href: '/',
      icon: <MdOndemandVideo className="w-auto h-8" />
    }
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
          {pages.map((tab: any, i: number) => (
            <MenuTab key={i} href={tab?.href}>
              {tab?.icon}
            </MenuTab>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Navbar
