<template>
  <div class="flex flex-col flex-auto h-full">
    <div
      class="relative flex flex-col justify-end flex-auto h-0 overflow-hidden"
    >
      <div
        ref="scrollEl"
        class="pb-4 overflow-y-auto"
        style="scroll-behavior: smooth"
      >
        <!-- intro -->
        <div class="px-4 pt-4 space-y-2">
          <div>
            <img
              class="w-20 h-20 rounded-full"
              src="/src/assets/discord-gray.png"
              alt="logo"
            />
          </div>
          <h1 class="text-4xl font-bold truncate select-none">Channel name</h1>
          <p class="select-none">
            This is the beginning of your direct message history with
            <b>Channel name</b>
          </p>
        </div>
        <div class="m-4 bg-divider h-0.25"></div>
        <MessagesList @scroll-bottom="handleScrollBottom" />
      </div>
    </div>
    <div class="flex-shrink-0 px-4 pb-6">
      <MessageInput />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import MessagesList from '@/components/MessagesList.vue'
import MessageInput from '@/components/MessageInput.vue'

export default defineComponent({
  name: 'ChatScreen',
  components: { MessagesList, MessageInput },
  setup() {
    const scrollEl = ref()

    let lastScrollHeight: number
    let firstTime = true
    function handleScrollBottom() {
      if (firstTime) {
        scrollEl.value.scrollTop = scrollEl.value.scrollHeight
        firstTime = false
      } else if (
        lastScrollHeight -
          (scrollEl.value.scrollTop + scrollEl.value.clientHeight) >
        22
      ) {
        console.log('noti new msg')
      } else {
        scrollEl.value.scrollTop = scrollEl.value.scrollHeight
      }
      lastScrollHeight = scrollEl.value.scrollHeight
    }

    return { scrollEl, handleScrollBottom }
  },
})
</script>
