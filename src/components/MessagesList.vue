<template>
  <div v-if="isLoading">Loading...</div>
  <section v-if="messages">
    <MessageItem
      v-for="(message, index) in messages"
      :key="message.id"
      :message="message"
      :show-header="!checkMessageCompact(message, messages[index - 1])"
    />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useInfiniteQuery } from 'vue-query'
import { getMessages } from '@/api/handler/messages'
import MessageItem from './MessageItem.vue'
import { Message } from '@/types'
import useMessageSocket from '@/api/ws/useMessageSocket'
import { getTimeDifference } from '@/helpers'

export default defineComponent({
  name: 'MessageList',
  components: { MessageItem },
  setup() {
    const route = useRoute()
    const channelId = route.params.id as string
    const qKey = `messages-${channelId}`
    const hasMore = ref(false)
    useMessageSocket(channelId, qKey)

    const { data, isLoading, fetchNextPage } = useInfiniteQuery(
      qKey,
      async ({ pageParam = null }) => {
        const { data } = await getMessages(channelId, pageParam)
        if (data.length !== 35) hasMore.value = false
        // if (data) return data.pages.flatMap((p: any) => p)
        return data
      },
      {
        getNextPageParam: (lastPage) =>
          hasMore.value && lastPage.length
            ? lastPage[lastPage.length - 1].createdAt
            : '',
      }
    )
    watch(data, (newVal) => {
      console.log(newVal)
    })
    const messages = computed(() => {
      console.log(data.value)
      return data.value?.pages.flatMap((p: any) => p).reverse()
    })

    function checkMessageCompact(m1: Message, m2: Message) {
      if (!m1 || !m2) return
      if (m1.user.id !== m2.user.id) return false
      return getTimeDifference(m1.createdAt, m2.createdAt) <= 5
    }

    return { isLoading, messages, checkMessageCompact }
  },
})
</script>
