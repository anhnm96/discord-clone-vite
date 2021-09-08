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
    console.log('mm')

    socket.on('new_message', (newMessage) => {
      console.log('new')
      cache.setQueryData<Message[]>(key, (d: any) => {
        console.log(d)
        d?.pages[0].unshift(newMessage)
        return d
      })
    })

    socket.on('edit_message', (editMessage) => {
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

    socket.on('delete_message', (toBeRemoved) => {
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

    socket.on('addToTyping', (username) => {
      console.log('addTyping', username)
      if (username !== userStore.current?.username) {
        channelStore.addTyping(username)
      }
    })

    socket.on('removeFromTyping', (username) => {
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