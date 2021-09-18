<template>
  <p v-if="typingString">{{ typingString }}</p>
  <div class="flex rounded-lg bg-textarea">
    <button class="self-start px-4 py-2 text-gray-400 hover:text-gray-300">
      <PlusCircleIcon class="w-6 h-6" />
    </button>
    <div class="relative flex-auto">
      <div
        v-show="showPlaceholder"
        class="absolute top-0 left-0 text-muted py-2.5 pr-4 pointer-events-none"
        aria-hidden="true"
      >
        {{ placeholder }}
      </div>
      <div
        ref="textareaEl"
        contenteditable="true"
        class="rounded caret-gray-300 py-2.5 pr-4 outline-none"
        @input="handleOnInput"
        @keydown.enter.exact.prevent="handleSendMessage"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery, useQueryClient } from 'vue-query'
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
    const cache = useQueryClient()
    const route = useRoute()
    const channelId = route.params.channelId as string
    const socket = getSocket()
    const userStore = useUser()
    const channelStore = useChannel()
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
    // watch(text, () => {
    //   if (!isTyping.value) {
    //     isTyping.value = true
    //     socket.emit('startTyping', channelId, userStore.current?.username)
    //     timeout = setTimeout(() => {
    //       isTyping.value = false
    //       socket.emit('stopTyping', channelId, userStore.current?.username)
    //     }, 2000)
    //   } else {
    //     clearTimeout(timeout)
    //     timeout = setTimeout(() => {
    //       isTyping.value = false
    //       socket.emit('stopTyping', channelId, userStore.current?.username)
    //     }, 2000)
    //   }
    // })

    const showPlaceholder = ref(true)
    function handleOnInput(e: any) {
      if (e.target.innerText.trim() !== '') {
        showPlaceholder.value = false
      } else {
        showPlaceholder.value = true
      }
    }

    function handleSendMessage(e: KeyboardEvent) {
      const textEl = e.target as HTMLDivElement
      if (!textEl.innerText.trim()) return
      isTyping.value = false
      socket.emit('stopTyping', channelId, userStore.current?.username)
      clearTimeout(timeout)
      const data = new FormData()
      data.append('text', textEl.innerText.trim())
      sendMessage(channelId, data)
      // update message
      cache.setQueryData(`messages-${channelId}`, (d: any) => {
        if (!d) return
        const res = { pages: [...d.pages], pageParams: d.pageParams }
        const copy = [...res.pages[0]]
        const date = Date.now() - 9 * 60 * 60 * 1000
        copy.unshift({
          text: textEl.innerText.trim(),
          id: Math.random() + '',
          createdAt: new Date(date).toISOString(),
          updatedAt: new Date(date).toISOString(),
          user: userStore.current,
        })
        res.pages[0] = copy
        return res
      })
      textEl.innerText = ''
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

    return {
      placeholder,
      handleSendMessage,
      typingString,
      handleOnInput,
      showPlaceholder,
    }
  },
})
</script>
