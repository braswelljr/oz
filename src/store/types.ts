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

export type Genre = {
  id: number
  name: string
}

export type State = {
  trends: MovieProps[]
  setTrends: (param: MovieProps[]) => void
  discovery: MovieProps[]
  setDiscovery: (param: MovieProps[]) => void
  genres: {
    movie: Genre[]
    tv: Genre[]
  }
  setMovieGenre: (param: Genre[]) => void
  setTvGenre: (param: Genre[]) => void
}
