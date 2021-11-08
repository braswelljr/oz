import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { trending, image as imageUrl } from '@/configs/urls'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
// styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

const Home = () => {
  const [page, setPage] = useState(1)
  const [trends, setTrends] = useStore(
    state => [state.trends, state.setTrends],
    shallow
  )
  // trending data fetch
  const { data: trendData, error: trendError } = useSWR(
    [
      `${trending}/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
      page
    ],
    url => fetch(url).then(res => res.json()),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )
  if (!trendError && trendData !== undefined) setTrends(trendData.results)

  if (trends.length <= 0 || !Array.isArray(trends)) {
    return (
      <main className="grid min-h-screen bg-yellow-400 place-items-center">
        <div
          className={clsx('h-20 w-20 bg-gray-800 rounded-full animate-ping')}
        />
      </main>
    )
  }

  return (
    <main className="">
      <header className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSlideChange={() => null}
          onSwiper={() => null}
          autoplay={{
            delay: 15000,
            disableOnInteraction: false
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
            type: 'bullets'
          }}
        >
          {Array.isArray(trends) &&
            trends.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            trends.map((trend: any) => (
              <SwiperSlide key={trend?.id}>
                <div className="w-full min-h-[650px] relative">
                  <Image
                    src={`${imageUrl}/original/${trend.backdrop_path}`}
                    alt={trend.title ?? trend.name ?? trend.original_title}
                    layout="fill"
                    objectFit="cover"
                    className="relative"
                  />
                  <div className="absolute inset-0 bg-gray-700 bg-opacity-60 z-[1] grid">
                    <div className="w-auto max-w-3xl px-6 mx-auto -mb-32 xl:max-w-5xl place-self-center">
                      <div className={clsx('')}>
                        <h1 className="text-2xl font-black text-yellow-500 md:text-4xl">
                          <span className={clsx('')}>
                            {trend.title ?? trend.name ?? trend.original_title}
                          </span>{' '}
                          <span className="inline-flex items-center px-4 text-sm text-white bg-amber-700 bg-opacity-80 rounded-2xl">
                            <HiStar className="w-auto h-4 text-yellow-300" />
                            <h4 className="">{trend.vote_average}</h4>
                          </span>
                        </h1>
                      </div>
                      <p className="mt-3 text-lg font-semibold text-gray-100 line-clamp-5 md:text-xl">
                        {trend?.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </header>
      <main>hello</main>
    </main>
  )
}

export default Home
