import { ReactChild, ReactChildren, ReactNode } from 'react'

export type MovieType = {
  id: number
  title?: string
  name?: string
  original_title?: string
  profile_path?: string
  poster_path?: string
  backdrop_path?: string
  overview?: string
  release_date?: string
  first_air_date?: string
  vote_average?: number
  vote_count?: number
  popularity?: number
  adult?: boolean
  video?: boolean
  original_language?: string
  genre_ids?: number[]
  media_type?: string
}

export type hrefType = string | { pathname: string; query?: { slug: string } }

export type LinkWithRefType = {
  children: ReactNode
  className?: string
  href?: hrefType
}

export type MainLayoutType = {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
}

export type Genre = {
  id: number
  name: string
}

export type State = {
  trends: MovieType[]
  setTrends: (param: MovieType[]) => void
  discovery: MovieType[]
  setDiscovery: (param: MovieType[]) => void
  genres: {
    movie: Genre[]
    tv: Genre[]
  }
  setMovieGenre: (param: Genre[]) => void
  setTvGenre: (param: Genre[]) => void
}
