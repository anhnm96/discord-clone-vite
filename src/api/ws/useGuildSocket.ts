import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from 'vue-query'
import { useUser } from '@/stores/user'
import getSocket from '@/api/getSocket'
import { gKey } from '@/helpers'

export default function useGuildSocket() {
  const userStore = useUser()
  const current = userStore.current
  const cache = useQueryClient()
  const socket = getSocket()
  const router = useRouter()

  onMounted(() => {
    socket.emit('joinUser', current?.id)

    socket.on('edit_guild', (editedGuild: any) => {
      console.log('edit_guild', editedGuild)
      cache.setQueryData(gKey, (d) => {
        const index = d?.findIndex((c) => c.id === editedGuild.id)
        if (index !== -1) {
          d[index] = {
            ...d[index],
            name: editedGuild.name,
            icon: editedGuild.icon,
          }
        }
        return d
      })
    })

    socket.on('delete_guild', (deleteId: string) => {
      console.log('delete_guild', deleteId)
      cache.setQueryData(gKey, (d) => {
        const isActive = location.pathname.includes(deleteId)
        if (isActive) {
          router.replace('/channels/me')
        }
        return d?.filter((g) => g.id !== deleteId)
      })
    })

    socket.on('remove_from_guild', (guildId: string) => {
      console.log('remove_from_guild', guildId)
      cache.setQueryData(gKey, (d) => {
        const isActive = location.pathname.includes(guildId)
        if (isActive) {
          router.replace('/channels/me')
        }
        return d.filter((g) => g.id !== guildId)
      })
    })

    socket.on('new_notification', (id: string) => {
      console.log('new_notification', id)
      if (!location.pathname.includes(id)) {
        cache.setQueryData(gKey, (d) => {
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
    socket.emit('leaveRoom', current?.id)
    socket.disconnect()
  })
}
