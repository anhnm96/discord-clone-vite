import { defineStore } from 'pinia'
import pinia from '@/plugins/pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      current: null,
    }
  },
  getters: {
    isAuth(state) {
      return state.current !== null
    },
  },
  actions: {
    setUser(user: any) {
      this.current = user
      localStorage.removeItem('user')
    },
    logout() {
      this.current = null
    },
  },
})

useUser(pinia).$subscribe((_mutation, state) => {
  localStorage.setItem('user', JSON.stringify(state))
})
