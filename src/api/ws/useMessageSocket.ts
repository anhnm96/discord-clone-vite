import { onMounted, onBeforeUnmount } from 'vue'
import { useQueryClient } from 'vue-query'
import { useChannel } from '@/stores/channel'
import { useUser } from '@/stores/user'
import getSocket from '@/api/getSocket'
import { Message } from '@/types'

export default function useMessageSocket(channelId: string, key: string) {
  const channelStore = useChannel()
  const userStore = useUser()
  const cache = useQueryClient()
  const socket = getSocket()

  onMounted(() => {
    channelStore.$reset()
    socket.emit('joinChannel', channelId)
    console.log('mm', socket.disconnected)

    socket.on('new_message', (newMessage: Message) => {
      console.log('new_message', newMessage)

      cache.setQueryData(key, (d: any) => {
        if (!d) return
        const res = { pages: [...d.pages], pageParams: d.pageParams }
        const copy = [...res.pages[0]]
        copy.unshift(newMessage)
        res.pages[0] = copy
        return res
      })
    })

    socket.on('edit_message', (editMessage: Message) => {
      console.log('edit_message', editMessage)
      cache.setQueryData(key, (d: any) => {
        if (!d) return
        let pageIndex = -1
        let editIndex = -1
        const res = { pages: [...d.pages], pageParams: d.pageParams }

        for (let i = 0; i < res.pages.length; i++) {
          const messages = res.pages[i]
          editIndex = messages.findIndex(
            (m: Message) => m.id === editMessage.id
          )
          if (editIndex !== -1) {
            pageIndex = i
            break
          }
        }

        if (pageIndex !== -1 && editIndex !== -1) {
          const copy = [...res.pages[pageIndex]]
          copy[editIndex] = editMessage
          res.pages[pageIndex] = copy
        }
        return res
      })
    })

    socket.on('delete_message', (toBeRemoved: Message) => {
      console.log('delete_message', toBeRemoved)
      cache.setQueryData(key, (d: any) => {
        if (!d) return
        let index = -1
        const res = { pages: [...d.pages], pageParams: d.pageParams }

        for (let i = 0; i < res.pages.length; i++) {
          const messages = res.pages[i]
          const toBeRemovedIndex = messages.findIndex(
            (m: Message) => m.id === toBeRemoved.id
          )
          if (toBeRemovedIndex !== -1) {
            index = i
            break
          }
        }

        if (index !== -1) {
          res.pages[index] = res.pages[index].filter(
            (m: Message) => m.id !== toBeRemoved.id
          )
        }
        return res
      })
    })

    socket.on('addToTyping', (username: string) => {
      console.log('addToTyping', username)
      if (username !== userStore.current?.username) {
        channelStore.addTyping(username)
      }
    })

    socket.on('removeFromTyping', (username: string) => {
      if (username !== userStore.current?.username) {
        channelStore.removeTyping(username)
      }
    })
  })

  onBeforeUnmount(() => {
    socket.emit('leaveRoom', channelId)
    socket.disconnect()
  })
}
