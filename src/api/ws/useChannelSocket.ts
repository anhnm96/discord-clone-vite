import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from 'vue-query'
import getSocket from '@/api/getSocket'
import { useGetCurrentGuild } from '@/hooks/useGetCurrentGuild'
import { Channel } from '@/types'

export default function useChannelSocket(guildId: string, key: string) {
  const router = useRouter()
  const cache = useQueryClient()
  const guild = useGetCurrentGuild(guildId)
  const socket = getSocket()

  onMounted(() => {
    socket.emit('joinGuild', guildId)

    socket.on('add_channel', (newChannel) => {
      console.log('add_channel', newChannel)
      cache.invalidateQueries(key)
      // cache.setQueryData(key, (data) => {
      //   return [...data, newChannel];
      // });
    })

    socket.on('edit_channel', (editedChannel: Channel) => {
      console.log('edit_channel', editedChannel)
      cache.setQueryData(key, (d: Channel[] | undefined): any => {
        if (!d) return
        const res = [...d]
        const index = res.findIndex((c) => c.id === editedChannel.id)
        if (index !== -1) {
          res[index] = editedChannel
        } else if (editedChannel.isPublic) {
          res.push(editedChannel)
        }
        return res
      })
    })

    socket.on('delete_channel', (deleteId: string) => {
      console.log('delete_channel', deleteId)
      cache.setQueryData(key, (d) => {
        const currentPath = `/channels/${guildId}/${deleteId}`
        if (location.pathname === currentPath && guild) {
          if (deleteId === guild.value?.default_channel_id) {
            router.replace('/channels/me')
          } else {
            router.replace(`${guild.value?.default_channel_id}`)
          }
        }
        return d?.filter((c) => c.id !== deleteId)
      })
    })

    socket.on('new_notification', (id: string) => {
      console.log('new_notification', id)
      const currentPath = `/channels/${guildId}/${id}`
      if (location.pathname !== currentPath) {
        cache.setQueryData(key, (d) => {
          const index = d?.findIndex((c) => c.id === id)
          if (index !== -1) {
            d[index] = { ...d[index], hasNotification: true }
          }
          return d
        })
      }
    })
  })

  onBeforeUnmount(() => {
    socket.emit('leaveGuild', guildId)
    socket.disconnect()
  })
}
