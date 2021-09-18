import { onMounted, onBeforeUnmount } from 'vue'
import { useQueryClient } from 'vue-query'
import getSocket from '@/api/getSocket'
import { User } from '@/types'
import { useUser } from '@/stores/user'
import { useHome } from '@/stores/home'
import { fKey, dmKey } from '@/helpers'

export default function useFriendSocket() {
  const cache = useQueryClient()
  const socket = getSocket()
  const userStore = useUser()
  const homeStore = useHome()

  onMounted(() => {
    socket.emit('joinUser', userStore.current?.id)
    socket.emit('getRequestCount')
    socket.on('add_friend', (newFriend: User) => {
      console.log('add_friend', newFriend)
      cache.setQueryData(fKey, (data: User[] | undefined): any => {
        if (!data) return
        return [...data, newFriend].sort((a, b) =>
          a.username.localeCompare(b.username)
        )
      })
    })

    socket.on('remove_friend', (memberId: string) => {
      console.log('remove_friend', memberId)
      cache.setQueryData(fKey, (data: User[] | undefined): any => {
        if (!data) return
        return [...data.filter((m) => m.id !== memberId)]
      })
    })

    socket.on('toggle_online', (memberId: string) => {
      console.log('toggle_online', memberId)
      cache.setQueryData(fKey, (data: User[] | undefined): any => {
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
      cache.setQueryData(dmKey, (data: any | undefined): any => {
        if (!data) return
        const res = [...data]
        const index = res.findIndex((m) => m.user.id === memberId)
        if (index !== -1) {
          const clonedObj = { ...res[index] }
          console.log(clonedObj)
          const clonedUser = { ...clonedObj.user }
          clonedUser.isOnline = true
          clonedObj.user = clonedUser
          res[index] = clonedObj
        }
        return res
      })
    })

    socket.on('toggle_offline', (memberId: string) => {
      console.log('toggle_offline', memberId)
      cache.setQueryData(fKey, (data: User[] | undefined): any => {
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
      cache.setQueryData(dmKey, (data: any | undefined): any => {
        if (!data) return
        const res = [...data]
        const index = res.findIndex((m) => m.user.id === memberId)
        if (index !== -1) {
          const clonedObj = { ...res[index] }
          console.log(clonedObj)
          const clonedUser = { ...clonedObj.user }
          clonedUser.isOnline = false
          clonedObj.user = clonedUser
          res[index] = clonedObj
        }
        return res
      })
    })

    socket.on('requestCount', (count: number) => {
      console.log('requestCount', count)
      homeStore.setRequests(count)
    })
  })

  onBeforeUnmount(() => {
    socket.emit('leaveRoom', userStore.current?.id)
    socket.disconnect()
  })
}
