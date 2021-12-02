import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

type Props = {
  children: ReactNode
  className?: string
  href?: string | { pathname: string; query?: { slug: string } }
} & LinkProps

const LinkWithRef = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, href }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
)

export default LinkWithRef
