<template>
  <div class="flex flex-col flex-grow h-screen bg-primary">
    <section class="flex-shrink-0 h-12 shadow-md">
      <div class="flex items-center justify-between h-full px-4 py-2">
        asd
        {{ currentChannel }}
        <!-- <p class="flex items-center space-x-2">
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
        </div> -->
      </div>
    </section>
    <main class="flex-grow">
      <!-- <ChatScreen /> -->
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ChatScreen from '@/components/ChatScreen.vue'
import { useGetCurrentChannel } from '@/hooks/useGetCurrentChannel'
import { cKey } from '@/helpers'

export default defineComponent({
  name: 'GuildChat',
  components: {
    ChatScreen,
  },
  setup() {
    const route = useRoute()
    const guildId = route.params.guildId as string
    const channelId = route.params.channelId as string
    console.log(channelId)
    const currentChannel = useGetCurrentChannel(guildId, channelId)
    return { currentChannel }
  },
})
</script>

<style></style>
