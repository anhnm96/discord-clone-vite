<template>
  <div class="flex flex-col flex-grow h-screen bg-primary">
    <section class="flex-shrink-0 h-12 shadow-md">
      <div class="flex items-center justify-between h-full px-4 py-2">
        <div class="flex items-center space-x-2">
          <AtSymbolIcon class="w-6 h-6" />
          <h3 class="h-6 font-semibold text-white" style="line-height: normal">
            {{ channel?.user.username }}
          </h3>
          <span
            class="w-2.5 h-2.5 rounded-full"
            :class="channel?.user.isOnline ? 'bg-green-400' : 'bg-gray-400'"
          ></span>
        </div>
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
    <main class="flex-grow">
      <ChatScreen :channel-name="channel?.user.username" />
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
import ChatScreen from '@/components/ChatScreen.vue'

export default defineComponent({
  name: 'Channel',
  components: {
    ChatScreen,
    PhoneOutgoingIcon,
    AtSymbolIcon,
    VideoCameraIcon,
  },
  setup() {
    const route = useRoute()
    const channelId = route.params.channelId as string
    const channel = useGetCurrentDM(channelId)

    return { channel }
  },
})
</script>
