import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  trends: any[]
  setTrends: (state: any[]) => void
  popular: any[]
  setPopular: (state: any[]) => void
}

const useStore = create<State>(
  devtools((set: SetState<State>) => ({
    trends: [],
    setTrends: (state: any[]) => set({ trends: state }),
    popular: [],
    setPopular: (state: any[]) => set({ popular: state })
  }))
)

export default useStore
