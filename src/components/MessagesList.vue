<template>
  <div v-if="isLoading">Loading...</div>
  <section v-if="messages">
    <div v-for="(message, index) in messages" :key="message.id" class="px-14">
      <MessageItem
        :message="message"
        :show-header="!checkMessageWithin(message, messages[index - 1], index)"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useInfiniteQuery } from 'vue-query'
import { getMessages } from '@/api/handler/messages'
import MessageItem from './MessageItem.vue'
import { Message } from '@/types'

export default defineComponent({
  name: 'MessageList',
  components: { MessageItem },
  setup() {
    const route = useRoute()
    const channelId = route.params.id as string
    const qKey = `messages-${channelId}`
    const hasMore = ref(false)

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
    const messages = computed(() => {
      return data.value?.pages.flatMap((p: any) => p)
    })

    function checkMessageWithin(m1: Message, m2: Message, index: number) {
      console.log(m1, m2, index)
      if (!m1 || !m2) return
      if (m1.user.id !== m2.user.id) return false
      return true
    }

    return { isLoading, messages, checkMessageWithin }
  },
})
</script>
