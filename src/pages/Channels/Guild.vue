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
                showAddChannelModal = true
                toggle(false)
              }
            "
          >
            <span>Create channel</span>
            <PlusCircleIcon class="w-4 h-4" />
          </button>
        </template>
      </dropdown>
    </section>
    <nav class="flex-grow p-2 bg-secondary">
      <ChannelItem
        v-for="channel in channels"
        :key="channel.id"
        :channel="channel"
        :guild-id="guildId"
      />
    </nav>
    <InviteModal v-if="showInviteModal" v-model="showInviteModal" />
    <GuildSettingsModal
      v-if="showGuildSettingModal && guild"
      v-model="showGuildSettingModal"
      :guild="guild"
    />
    <AddChannelModal v-model="showAddChannelModal" :guild-id="guildId" />
    <UserPanel />
  </div>
  <div class="flex flex-col flex-grow h-screen bg-primary">asd</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from 'vue-query'
import {
  ChevronDownIcon,
  UserAddIcon,
  CogIcon,
  PlusCircleIcon,
} from '@heroicons/vue/solid'
import { useGetCurrentGuild } from '@/hooks/useGetCurrentGuild'
import { cKey } from '@/helpers'
import { useUser } from '@/stores/user'
import UserPanel from '@/components/UserPanel.vue'
import InviteModal from '@/components/modals/InviteModal.vue'
import GuildSettingsModal from '@/components/modals/GuildSettingsModal.vue'
import ChannelItem from '@/components/ChannelItem.vue'
import { getChannels } from '@/api/handler/channel'
import useChannelSocket from '@/api/ws/useChannelSocket'
import { Channel } from '@/types'
import AddChannelModal from '@/components/modals/AddChannelModal.vue'

export default defineComponent({
  name: 'Guild',
  components: {
    ChevronDownIcon,
    UserAddIcon,
    CogIcon,
    PlusCircleIcon,
    UserPanel,
    InviteModal,
    GuildSettingsModal,
    AddChannelModal,
    ChannelItem,
  },
  setup() {
    const route = useRoute()
    const userStore = useUser()
    const guildId = route.params.guildId as string
    const key = cKey(guildId)
    const guild = useGetCurrentGuild(guildId)
    const showInviteModal = ref(false)
    const showGuildSettingModal = ref(false)
    const showAddChannelModal = ref(false)

    const { data: channels } = useQuery<Channel[]>(key, () =>
      getChannels(guildId).then((res) => res.data)
    )

    useChannelSocket(guildId, key)

    const isOwner = computed(() => {
      return guild.value?.ownerId === userStore.current?.id
    })

    return {
      guild,
      guildId,
      channels,
      showInviteModal,
      showGuildSettingModal,
      showAddChannelModal,
      isOwner,
    }
  },
})
</script>

<style></style>
