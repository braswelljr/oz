import React from 'react'
import Image from 'next/image'
import { image } from '@/configs/urls'
import { HiStar } from 'react-icons/hi'
import clsx from 'clsx'
import { MovieProps } from '@/store/types'

const Movie = ({ movie, id }: MovieProps) => {
  return (
    <div
      className={clsx('overflow-hidden bg-stone-100 mr-3', id == 0 && 'ml-3')}
      key={movie?.id}
    >
      <div className="relative w-full bg-neutral-800 h-60">
        <Image
          src={`${image}/original/${movie?.poster_path}`}
          alt={movie?.name ?? movie?.title}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 object-cover w-full h-full"
        />
      </div>
      <div className="px-2 py-2">
        <div className="flex items-center text-xs font-medium leading-6 text-gray-600">
          <span className="sr-only">Star rating</span>
          <HiStar className="w-auto h-5 text-amber-400" />
          <span className="">{movie?.vote_average}</span>
        </div>
        <h3 className="text-sm font-black line-clamp-1">
          {movie?.name ?? movie?.title}
        </h3>
        <div className="">
          <span className="px-1.5 ring-1 min-w-[2.5rem] text-center py-1 text-xs ring-gray-300 rounded-sm">
            {movie?.media_type}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Movie
