<template>
  <div class="flex flex-col flex-shrink-0 w-60 bg-secondary">
    <section class="flex-shrink-0 h-12">
      <dropdown
        class="w-full h-full"
        trigger-class="flex items-center justify-between w-full h-full px-4 py-2 text-white transition isolate shadow-low hover:bg-modifier-hover"
      >
        <template #trigger>
          <p class="font-semibold truncate">{{ guild?.name }}</p>
          <ChevronDownIcon class="flex-shrink-0 w-5 h-5" />
        </template>
        <template #dropdown="{ toggle }">
          <button
            class="
              w-full
              py-1.5
              px-2
              hover:bg-purple hover:text-white
              rounded
              flex
              items-center
              justify-between
            "
            @click="
              () => {
                showInviteModal = true
                toggle(false)
              }
            "
          >
            <span>Invite people</span>
            <UserAddIcon class="w-4 h-4" />
          </button>
          <button
            v-if="isOwner"
            class="
              w-full
              py-1.5
              px-2
              hover:bg-purple hover:text-white
              rounded
              flex
              items-center
              justify-between
            "
            @click="
              () => {
                showGuildSettingModal = true
                toggle(false)
              }
            "
          >
            <span>Server settings</span>
            <CogIcon class="w-4 h-4" />
          </button>
          <button
            class="
              w-full
              py-1.5
              px-2
              hover:bg-purple hover:text-white
              rounded
              flex
              items-center
              justify-between
            "
          >
            <span>Create channel</span>
            <PlusCircleIcon class="w-4 h-4" />
          </button>
        </template>
      </dropdown>
    </section>
    <nav class="flex-grow p-2 bg-secondary">
      <router-link
        to="/channels/me"
        class="flex items-center px-2 py-2 rounded  bg-active hover:bg-modifier-hover"
      >
        <HashtagIcon class="w-6 h-6 text-muted" />
        <p class="ml-2 font-semibold text-white truncate">Friends</p>
        <button class="ml-auto" aria-label="create invite">
          <UserAddIcon class="w-4 h-4" />
        </button>
      </router-link>
    </nav>
    <InviteModal v-if="showInviteModal" v-model="showInviteModal" />
    <GuildSettingsModal
      v-if="showGuildSettingModal && guild"
      v-model="showGuildSettingModal"
      :guild="guild"
    />
    <UserPanel />
  </div>
  <div class="flex flex-col flex-grow h-screen bg-primary">asd</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronDownIcon,
  HashtagIcon,
  UserAddIcon,
  CogIcon,
  PlusCircleIcon,
} from '@heroicons/vue/solid'
import { useGetCurrentChannel } from '@/hooks/useGetCurrentChannel'
import { useGetCurrentGuild } from '@/hooks/useGetCurrentGuild'
import { cKey } from '@/helpers'
import { useUser } from '@/stores/user'
import UserPanel from '@/components/UserPanel.vue'
import InviteModal from '@/components/modals/InviteModal.vue'
import GuildSettingsModal from '@/components/modals/GuildSettingsModal.vue'

export default defineComponent({
  name: 'Guild',
  components: {
    ChevronDownIcon,
    HashtagIcon,
    UserAddIcon,
    CogIcon,
    PlusCircleIcon,
    UserPanel,
    InviteModal,
    GuildSettingsModal,
  },
  setup() {
    const route = useRoute()
    const userStore = useUser()
    const channelId = route.params.channelId as string
    const guildId = route.params.guildId as string
    const guild = useGetCurrentGuild(guildId)
    const channel = useGetCurrentChannel(channelId, cKey(guildId))
    const showInviteModal = ref(false)
    const showGuildSettingModal = ref(false)

    const isOwner = computed(() => {
      return guild.value?.ownerId === userStore.current?.id
    })

    return { guild, channel, showInviteModal, showGuildSettingModal, isOwner }
  },
})
</script>

<style></style>
