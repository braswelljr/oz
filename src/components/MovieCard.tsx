import React from 'react'
import Image from 'next/image'
import { image } from '@/configs/urls'

export type MovieProps = {
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
  movie_type?: string
}

const Movie = (movie: MovieProps) => {
  return (
    <div className="w-32 h-48">
      <div className="relative w-full h-36">
        <Image
          src={`${image}/original/${movie?.profile_path}`}
          alt={movie?.name ?? movie?.title}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 object-cover w-full h-full"
        />
      </div>
      <div className=""></div>
    </div>
  )
}

export default Movie
