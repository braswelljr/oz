import { useEffect, useState, useRef } from 'react'
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
import MovieCard, { MovieProps } from '@/components/MovieCard'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

const Home = () => {
  const [page, setPage] = useState(1)
  const [trends, setTrends] = useStore(
    state => [state.trends, state.setTrends],
    shallow
  )
  const [isMobile, setIsMobile] = useState('desktop')
  // detect device
  useEffect(() => {
    ;/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
      navigator.userAgent
    )
      ? setIsMobile('phone')
      : setIsMobile('desktop')
  }, [isMobile])
  //-> tabs
  const popPrevRef = useRef(null)
  const popNextRef = useRef(null)
  // trending data fetch
  const { data: trendData, error: trendError } = useSWR(
    [
      `${trending}/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
      page
    ],
    url => fetch(url).then(res => res.json()),
    { refreshInterval: 60000, shouldRetryOnError: true }
  )
  if (!trendError && trendData !== undefined) {
    setTrends(trendData.results)
  }

  // error
  if (trends.length <= 0 || !Array.isArray(trends)) {
    return (
      <main className="grid min-h-screen bg-neutral-900 place-items-center">
        <div
          className={clsx('h-20 w-20 bg-neutral-800 rounded-full animate-ping')}
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
            trends.map((trend: any) => (
              <SwiperSlide key={trend?.id}>
                <div className="w-full h-[650px] relative">
                  <Image
                    src={`${imageUrl}/original/${trend.backdrop_path}`}
                    alt={trend.title ?? trend.name ?? trend.original_title}
                    layout="fill"
                    objectFit="cover"
                    className="relative"
                  />
                  <div className="absolute inset-0 bg-neutral-700 bg-opacity-60 z-[1] grid">
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
                      <p className="mt-3 text-lg font-semibold text-neutral-100 line-clamp-5 md:text-xl">
                        {trend?.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </header>
      <main className={clsx('py-10')}>
        {/* Popular section */}
        <section className="py-7">
          <h3 className="mx-4 text-lg font-black text-neutral-600 lg:text-xl">
            Popular
          </h3>
          <section className="py-3">
            <div className="relative">
              <div className={clsx('relative')}>
                <Swiper
                  initialSlide={0}
                  spaceBetween={0}
                  onSnapIndexChange={() => null}
                  slidesPerView={4}
                  speed={300}
                  navigation={{
                    prevEl: popPrevRef.current,
                    nextEl: popNextRef.current
                  }}
                  onInit={(swiper: any) => {
                    swiper.params.navigation.prevEl = popPrevRef.current
                    swiper.params.navigation.nextEl = popNextRef.current
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 2
                    },
                    // when window width is >= 480px
                    425: {
                      slidesPerView: 3
                    },
                    // when window width is >= 640px
                    640: {
                      slidesPerView: 4
                    },
                    720: {
                      slidesPerView: 5
                    },
                    1024: {
                      slidesPerView: 7
                    },
                    1440: {
                      slidesPerView: 9
                    },
                    1920: {
                      slidesPerView: 11
                    }
                  }}
                >
                  {Array.isArray(trends) &&
                    trends.length > 0 &&
                    trends.map((movie: MovieProps, id: number) => (
                      <SwiperSlide key={movie?.id}>
                        <MovieCard id={id} movie={movie} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </section>
        </section>
      </main>
    </main>
  )
}

export default Home
