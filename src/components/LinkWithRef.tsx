import { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { LinkWithRefType } from '@/store/types'

const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefType & LinkProps>(
  ({ children, className, href }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className}>
        {children}
      </a>
    </Link>
  )
)

export default LinkWithRef
