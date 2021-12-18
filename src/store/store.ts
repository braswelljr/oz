import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'
import { State, MovieType, Genre } from '@/store/types'

const useStore = create<State>(
  devtools((set: SetState<State>) => ({
    trends: [],
    setTrends: (param: MovieType[]) => set({ trends: param }),
    discovery: [],
    setDiscovery: (param: MovieType[]) => set({ discovery: param }),
    genres: {
      movie: [],
      tv: []
    },
    setMovieGenre: (param: Genre[]) =>
      set((state: State) => ({ genres: { ...state.genres, movie: param } })),
    setTvGenre: (param: Genre[]) =>
      set((state: State) => ({ genres: { ...state.genres, tv: param } }))
  }))
)

export default useStore
