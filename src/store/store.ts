import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  trends: []
  setTrends: (state: []) => void
}

const useStore = create<State>(
  devtools((set: SetState<State>) => ({
    trends: [],
    setTrends: (state: []) => set({ trends: state })
  }))
)

export default useStore
