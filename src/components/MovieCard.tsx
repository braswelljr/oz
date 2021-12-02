import React from 'react'
import Image from 'next/image'
import { image } from '@/configs/urls'
import { HiStar } from 'react-icons/hi'
import clsx from 'clsx'

export type MovieProps = {
  id: number
  movie?: {
    id: number
    title?: string
    name?: string
    original_title?: string
    profile_path?: string
    poster_path?: string
    backdrop_path?: string
    overview?: string
    release_date?: string
    vote_average?: number
    vote_count?: number
    popularity?: number
    adult?: boolean
    video?: boolean
    original_language?: string
    genre_ids?: number[]
    media_type?: string
  }
}

const Movie = ({ movie, id }: MovieProps) => {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-md shadow mr-3',
        id == 0 && 'ml-3'
      )}
      key={movie?.id}
    >
      <div className="relative w-full h-60">
        <Image
          src={`${image}/original/${movie?.poster_path}`}
          alt={movie?.name ?? movie?.title}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 object-cover w-full h-full"
        />
      </div>
      <div className="px-1 py-2 bg-yellow-50">
        <div className="flex items-center space-x-2">
          <HiStar className="w-auto h-5 text-yellow-400" />
          <span className="text-sm font-bold">{movie?.vote_average}</span>
        </div>
        <h3 className="text-sm font-black line-clamp-1">
          {movie?.name ?? movie?.title}
        </h3>
        <div className="">
          <span className="px-1 text-xs font-bold text-gray-600 bg-yellow-200 rounded">
            {movie?.media_type}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Movie
