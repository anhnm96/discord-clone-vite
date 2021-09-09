<template>
  <div class="flex flex-col flex-grow bg-primary">
    <section class="h-12 shadow-md">
      <div class="flex items-center justify-between h-full px-4 py-2">
        <p class="flex items-center space-x-2">
          <span class="tex"><AtSymbolIcon class="w-6 h-6" /></span>
          <span>{{ channel?.user.username }}</span>
          <span class="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
        </p>
        <div class="flex space-x-4">
          <button class="grid hover:text-hover place-items-center">
            <PhoneOutgoingIcon class="w-6 h-6" />
          </button>
          <button class="grid hover:text-hover place-items-center">
            <VideoCameraIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
    <main class="flex flex-col flex-auto">
      <div class="relative flex flex-col justify-end flex-auto py-4">
        <!-- intro -->
        <div class="px-4 space-y-2">
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
      <div class="flex-shrink-0 px-4 pb-6">
        <MessageInput />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import {
  PhoneOutgoingIcon,
  AtSymbolIcon,
  VideoCameraIcon,
} from '@heroicons/vue/solid'
import { useGetCurrentDM } from '@/hooks'
import MessagesList from '@/components/MessagesList.vue'
import MessageInput from '@/components/MessageInput.vue'

export default defineComponent({
  name: 'Channel',
  components: {
    PhoneOutgoingIcon,
    AtSymbolIcon,
    VideoCameraIcon,
    MessageInput,
    MessagesList,
  },
  setup() {
    const route = useRoute()
    const channelId = route.params.id as string
    const channel = useGetCurrentDM(channelId)

    return { channel }
  },
})
</script>
