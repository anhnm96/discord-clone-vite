import { onMounted, onBeforeUnmount } from 'vue'
import getSocket from '@/api/getSocket'
import { useUser } from '@/stores/user'
import { useHome } from '@/stores/home'

export default function useGlobal() {
  const socket = getSocket()
  const userStore = useUser()
  const homeStore = useHome()

  onMounted(() => {
    socket.emit('toggleOnline')
    socket.emit('joinUser', userStore.current?.id)

    const incrementNotification = () => {
      if (!window.location.pathname.includes('/channels/me')) {
        homeStore.increment()
      }
    }

    socket.on('push_to_top', () => {
      incrementNotification()
    })

    socket.on('send_request', () => {
      incrementNotification()
    })
  })

  window.addEventListener('beforeunload', () => {
    socket.emit('toggleOffline')
    socket.disconnect()
  })

  onBeforeUnmount(() => {
    socket.emit('toggleOffline')
    socket.disconnect()
  })
}
