import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

export type LinkWithRefProps = {
  children: ReactNode
  className?: string
  href?: string | { pathname: string; query?: { slug: string } }
}

const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefProps & LinkProps>(
  ({ children, className, href }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
)

export default LinkWithRef
