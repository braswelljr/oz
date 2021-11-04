import type { NextPage } from 'next'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <main className="">
      <div className="w-20">
        <Image
          src={require('@/img/one.png')}
          className="w-10 h-auto"
          alt="Tv"
        />
      </div>
    </main>
  )
}

export default Home
