import { defineStore } from 'pinia'
import { User } from '@/types'

type UserState = {
  current: User | null
}

export const useUser = defineStore('user', {
  state: () => {
    return {
      current: null,
    } as UserState
  },
  getters: {
    isAuth(state) {
      return state.current !== null
    },
  },
  actions: {
    setUser(user: any) {
      this.current = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.current = null
      localStorage.removeItem('user')
    },
  },
})

