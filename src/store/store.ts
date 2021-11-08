import create, { SetState } from 'zustand'
import { devtools } from 'zustand/middleware'

type State = {
  trends: any[]
  setTrends: (state: any[]) => void
}

const useStore = create<State>(
  devtools((set: SetState<State>) => ({
    trends: [],
    setTrends: (state: any[]) => set({ trends: state })
  }))
)

export default useStore
