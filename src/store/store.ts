import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'
import { MovieProps } from '@/components/MovieCard'

type State = {
  trends: MovieProps[]
  setTrends: (state: MovieProps[]) => void
  discovery: MovieProps[]
  setDiscovery: (state: MovieProps[]) => void
}

const useStore = create<State>(
  devtools((set: SetState<State>) => ({
    trends: [],
    setTrends: (state: any[]) => set({ trends: state }),
    discovery: [],
    setDiscovery: (state: any[]) => set({ discovery: state })
  }))
)

export default useStore
