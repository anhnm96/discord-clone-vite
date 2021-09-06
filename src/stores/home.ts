import { defineStore } from 'pinia'

type HomeState = {
  notiCount: number
  requestCount: number
}

export const useHome = defineStore('home', {
  state: () => {
    return {
      notiCount: 0,
      requestCount: 0
    } as HomeState
  },
  actions: {
    reset() {
      this.notiCount = 0
    },
    resetRequest() {
      this.requestCount = 0
    },
    setRequests(r: number) {
      this.requestCount = r
    },
    increment() {
      this.notiCount += 1
    }
  },
})

