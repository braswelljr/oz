import { ReactChild, ReactChildren } from 'react'
import Search from '@/components/Search'
import Navbar from '@/components/Navbar'

interface Props {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Search />
      <Navbar />
      {children}
    </>
  )
}

export default MainLayout
