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
    addTyping(username: string) {
      this.typingUsers.push(username)
    },
    removeTyping(username: string) {
      this.typingUsers = this.typingUsers.filter((u) => u !== username)
    },
  },
})
