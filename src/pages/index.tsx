import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { trending, image as imageUrl } from '@/configs/urls'
import useStore from '@/store/store'
import shallow from 'zustand/shallow'
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
    `${trending}/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    url => fetch(url).then(res => res.json()),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )
  if (!trendError && trendData !== undefined) setTrends(trendData.results)

  if (trends.length <= 0 || !Array.isArray(trends)) {
    return (
      <main>
        <div className="">Not found</div>
      </main>
    )
  }

  return (
    <main className="">
      <header className="w-full min-h-[650px]">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSlideChange={() => null}
          onSwiper={() => null}
          autoplay={{
            delay: 5000,
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
                  <div className="absolute inset-0 bg-cyan-300 bg-opacity-20 z-[1]">
                    {trend?.id}
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
