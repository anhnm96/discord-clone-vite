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
      console.log('new', newMessage)

      cache.setQueryData(key, (d: any) => {
        console.log(d)
        d?.pages[0].unshift(newMessage)
        return d
      })
      cache.invalidateQueries(key)
    })

    socket.on('edit_message', (editMessage: Message) => {
      cache.setQueryData(key, (d) => {
        let index = -1
        let editId = -1
        d?.pages.forEach((p, i) => {
          editId = p.findIndex((m) => m.id === editMessage.id)
          if (editId !== -1) index = i
        })

        if (index !== -1 && editId !== -1) {
          d.pages[index][editId] = editMessage
        }
        return d
      })
    })

    socket.on('delete_message', (toBeRemoved: Message) => {
      cache.setQueryData(key, (d: any) => {
        let index = -1
        d?.pages.forEach((p, i) => {
          if (p.findIndex((m) => m.id === toBeRemoved.id) !== -1) index = i
        })
        if (index !== -1) {
          d.pages[index] = d?.pages[index].filter(
            (m) => m.id !== toBeRemoved.id
          )
        }
        return d
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
