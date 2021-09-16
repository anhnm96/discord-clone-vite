<template>
  <div class="flex flex-col h-full">
    <div
      class="relative flex flex-col justify-end flex-auto h-0 overflow-hidden"
    >
      <div class="pb-4 overflow-y-auto">
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
        <MessagesList />
      </div>
    </div>
    <div class="flex-shrink-0 px-4 pb-6">
      <MessageInput />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessagesList from '@/components/MessagesList.vue'
import MessageInput from '@/components/MessageInput.vue'

export default defineComponent({
  name: 'ChatScreen',
  components: { MessagesList, MessageInput },
})
</script>
