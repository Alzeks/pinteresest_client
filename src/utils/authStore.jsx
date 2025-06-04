import { create } from 'zustand'
import {persist} from 'zustand/middleware'

const useAuthStore = create(
    persist((set) => ({
  currentUser: null, 
  //setCurrentUser: () => set((newUser) => ({ currentUser: newUser })),
  setCurrentUser: (newUser) => set({ currentUser: newUser }),
  removeCurrentUser: () => set({ currentUser: null }),
  updateCurrentUser: (updatedUser) => set({ CurrentUser: updatedUser }),
}))
)
export default useAuthStore;