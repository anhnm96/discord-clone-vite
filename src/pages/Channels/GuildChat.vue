<template>
  <div class="flex flex-col flex-grow h-screen bg-primary">
    <section class="flex-shrink-0 h-12 shadow-md">
      <div class="flex items-center justify-between h-full px-4 py-2">
        <div class="flex items-center space-x-2">
          <HashtagIcon class="w-6 h-6 text-muted" />
          <p class="font-semibold text-white truncate">
            {{ currentChannel?.name }}
          </p>
        </div>
        <div class="flex space-x-4">
          <button class="w-6 h-6 hover:text-hover">
            <BellIcon />
          </button>
          <button class="w-6 h-6 hover:text-hover">
            <UsersIcon />
          </button>
          <button class="w-6 h-6 hover:text-hover">
            <InboxIcon />
          </button>
          <button class="w-6 h-6 hover:text-hover">
            <QuestionMarkCircleIcon />
          </button>
        </div>
      </div>
    </section>
    <main class="flex flex-grow">
      <ChatScreen :channel-name="currentChannel?.name" />
      <aside
        class="flex-shrink-0 pb-4 w-60 bg-secondary"
        :aria-label="`Members list for ${currentChannel?.name} (channel)`"
      >
        <div class="h-full overflow-y-auto">
          <div
            role="list"
            aria-label="Members"
            class="pt-6 pl-4 pr-2 space-y-1"
          >
            <h2
              class="px-2 text-xs font-semibold uppercase"
              :aria-label="`Online, ${online?.length} member`"
            >
              <span aria-hidden="true">Online — {{ online?.length }}</span>
            </h2>
            <div v-for="member in online" :key="member.id" role="listitem">
              <div
                class="flex items-center px-2 py-1 space-x-2 rounded  hover:bg-modifier-hover hover:text-white"
              >
                <Avatar
                  :img="member.image"
                  :is-online="member.isOnline"
                  :username="member.username"
                />
                <div>
                  <span>{{ member.username }}</span>
                </div>
              </div>
            </div>
            <!-- offline -->
            <h2
              class="px-2 text-xs font-semibold uppercase"
              :aria-label="`Offline, ${offline?.length} member`"
            >
              <span aria-hidden="true">Offline — {{ offline?.length }}</span>
            </h2>
            <div v-for="member in offline" :key="member.id" role="listitem">
              <div
                class="flex items-center px-2 py-1 space-x-2 rounded  hover:bg-modifier-hover hover:text-white"
              >
                <Avatar
                  :img="member.image"
                  :is-online="member.isOnline"
                  :username="member.username"
                />
                <div>
                  <span>{{ member.username }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  HashtagIcon,
  BellIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/solid'
import ChatScreen from '@/components/ChatScreen.vue'
import { useGetCurrentChannel } from '@/hooks/useGetCurrentChannel'
import { useGetGuildMembers } from '@/hooks/useGetCurrentGuild'
import { User } from '@/types'
import useMemberSocket from '@/api/ws/useMemberSocket'

export default defineComponent({
  name: 'GuildChat',
  components: {
    HashtagIcon,
    BellIcon,
    UsersIcon,
    InboxIcon,
    QuestionMarkCircleIcon,
    ChatScreen,
  },
  setup() {
    const route = useRoute()
    const guildId = route.params.guildId as string
    const channelId = route.params.channelId as string
    const currentChannel = useGetCurrentChannel(guildId, channelId)

    useMemberSocket(guildId)
    const { data: guildMembers } = useGetGuildMembers(guildId)
    const online = computed(() =>
      guildMembers.value?.filter((member: User) => member.isOnline)
    )
    const offline = computed(() =>
      guildMembers.value?.filter((member: User) => !member.isOnline)
    )

    return { currentChannel, online, offline }
  },
})
</script>

<style></style>
