import { onMounted, onBeforeUnmount } from 'vue'
import { useQueryClient } from 'vue-query'
import getSocket from '@/api/getSocket'
import { User } from '@/types'
import { mKey } from '@/helpers'

export default function useMemberSocket(guildId: string) {
  const cache = useQueryClient()
  const socket = getSocket()
  const key = mKey(guildId)

  onMounted(() => {
    socket.emit('joinGuild', guildId)
    socket.on('add_member', (newMember: User) => {
      console.log('add_member', newMember)
      cache.setQueryData(key, (data: User[] | undefined): any => {
        if (!data) return
        return [...data, newMember].sort((a, b) =>
          a.username.localeCompare(b.username)
        )
      })
    })

    socket.on('remove_member', (memberId: string) => {
      console.log('remove_member', memberId)
      cache.setQueryData(key, (data: User[] | undefined): any => {
        if (!data) return
        return [...data?.filter((m) => m.id !== memberId)]
      })
    })

    socket.on('toggle_online', (memberId: string) => {
      // cache.invalidateQueries(key)
      console.log('toggle_online', memberId)
      cache.setQueryData(key, (data: User[] | undefined): any => {
        if (!data) return
        const res = [...data]
        const index = res.findIndex((m) => m.id === memberId)
        if (index !== -1) {
          const clonedObj = { ...res[index] }
          clonedObj.isOnline = true
          res[index] = clonedObj
        }
        return res
      })
    })

    socket.on('toggle_offline', (memberId: string) => {
      console.log('toggle_offline', memberId)
      cache.setQueryData(key, (data: User[] | undefined): any => {
        if (!data) return
        const res = [...data]
        const index = res.findIndex((m) => m.id === memberId)
        if (index !== -1) {
          const clonedObj = { ...res[index] }
          clonedObj.isOnline = false
          res[index] = clonedObj
        }
        return res
      })
    })
  })

  onBeforeUnmount(() => {
    socket.emit('leaveRoom', guildId)
    socket.disconnect()
  })
}
