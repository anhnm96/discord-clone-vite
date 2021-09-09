<template>
  <p v-if="typingString">{{ typingString }}</p>
  <div class="flex rounded-lg bg-textarea">
    <button class="self-start px-4 py-2 text-gray-400 hover:text-gray-300">
      <PlusCircleIcon class="w-6 h-6" />
    </button>
    <textarea
      v-model.trim="text"
      :placeholder="placeholder"
      class="flex-auto py-2 pr-2 bg-transparent outline-none resize-none"
      @keydown.enter="handleSendMessage"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from 'vue-query'
import { PlusCircleIcon } from '@heroicons/vue/solid'
import { cKey, dmKey } from '@/helpers'
import { DirectMessage } from '@/types'
import getSocket from '@/api/getSocket'
import { useUser } from '@/stores/user'
import { useChannel } from '@/stores/channel'
import { sendMessage } from '@/api/handler/messages'

export default defineComponent({
  name: 'MessageInput',
  components: { PlusCircleIcon },
  setup() {
    const route = useRoute()
    const channelId = route.params.id as string
    const socket = getSocket()
    const userStore = useUser()
    const channelStore = useChannel()
    const text = ref('')
    const isSubmitting = ref(false)
    const isTyping = ref(false)
    const qKey = route.name === 'DM' ? dmKey : cKey(channelId)
    const { data } = useQuery<DirectMessage[]>(qKey)

    const channel = computed(() => data.value?.find((c) => c.id === channelId))
    const placeholder = computed(() => {
      if (channel.value?.user) {
        return `Message @${channel.value.user.username}`
      }
      return `Message #${channel.value?.name}`
    })

    let timeout: number
    watch(text, () => {
      if (!isTyping.value) {
        isTyping.value = true
        socket.emit('startTyping', channelId, userStore.current?.username)
        timeout = setTimeout(() => {
          isTyping.value = false
          socket.emit('stopTyping', channelId, userStore.current?.username)
        }, 2000)
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          isTyping.value = false
          socket.emit('stopTyping', channelId, userStore.current?.username)
        }, 2000)
      }
    })

    async function handleSendMessage() {
      if (!text.value) return
      isTyping.value = false
      isSubmitting.value = true
      socket.emit('stopTyping', channelId, userStore.current?.username)
      clearTimeout(timeout)
      const data = new FormData()
      data.append('text', text.value)
      await sendMessage(channelId, data)
      text.value = ''
      isSubmitting.value = false
    }

    const typingString = computed(() => {
      switch (channelStore.typingUsers.length) {
        case 0:
          return ''
        case 1:
          return channelStore.typingUsers[0] + ' is typing'
        case 2:
          return `${channelStore.typingUsers[0]} and ${channelStore.typingUsers[1]} are typing`
        case 3:
          return `${channelStore.typingUsers[0]}, ${channelStore.typingUsers[1]} and ${channelStore.typingUsers[2]} are typing`
        default:
          return 'Several people are typing'
      }
    })

    return { placeholder, handleSendMessage, text, typingString }
  },
})
</script>
