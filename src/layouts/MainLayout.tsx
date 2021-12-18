import { useState } from 'react'
import Search from '@/components/Search'
import Navbar from '@/components/Navbar'
import { MainLayoutType } from '@/store/types'

const MainLayout = ({ children }: MainLayoutType) => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <>
      <Search open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />
      {children}
    </>
  )
}

export default MainLayout
