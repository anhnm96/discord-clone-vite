import { defineStore } from 'pinia'

type ChannelState = {
  typingUsers: string[]
}

export const useChannel = defineStore('channel', {
  state: () => {
    return {
      typingUsers: [],
    } as ChannelState
  },
  actions: {
    reset() {
      this.typingUsers = []
    },
    removeTyping(username: string) {
      this.typingUsers = this.typingUsers.filter((u) => u !== username)
    },
  },
})
