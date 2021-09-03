import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      current: null,
    }
  },
  getters: {
    isAuth(state) {
      return state.current !== null
    }
  },
  actions: {
    setUser(user: any) {
      this.current = user
    },
    logout() {
      this.current = null
    }
  }
})
