import { ReactChild, ReactChildren, Fragment } from 'react'
import Search from '@/components/Search'
import Navbar from '@/components/Navbar'

interface Props {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
}

const MainLayout = ({ children }: Props) => {
  return (
    <Fragment>
      <Search />
      <Navbar />
      {children}
    </Fragment>
  )
}

export default MainLayout
