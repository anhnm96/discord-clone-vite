<template>
  <div class="relative hover:bg-modifier-hover hover:text-hover">
    <router-link
      :to="`/channels/${guildId}/${channel.id}`"
      class="flex items-center py-2 pl-2 rounded pr-11"
      active-class="text-white bg-modifier-selected"
    >
      <HashtagIcon v-if="channel.isPublic" class="w-5 h-5 text-muted" />
      <LockClosedIcon v-else class="w-5 h-5 text-muted" />

      <p class="ml-2 font-semibold truncate">{{ channel.name }}</p>
    </router-link>
    <div
      v-if="isOwner"
      class="absolute flex items-center ml-auto space-x-1 -translate-y-1/2  top-1/2 right-2"
    >
      <button aria-label="Create invite">
        <UserAddIcon class="w-4 h-4" />
      </button>
      <button aria-label="Edit channel" @click="showChannelSettingModal = true">
        <CogIcon class="w-4 h-4" />
      </button>
    </div>
    <ChannelSettingsModal
      v-if="showChannelSettingModal"
      v-model="showChannelSettingModal"
      :channel="channel"
      :guild-id="guildId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import {
  HashtagIcon,
  LockClosedIcon,
  UserAddIcon,
  CogIcon,
} from '@heroicons/vue/solid'
import { Channel } from '@/types'
import ChannelSettingsModal from '@/components/modals/ChannelSettingsModal.vue'

export default defineComponent({
  name: 'ChannelItem',
  components: {
    HashtagIcon,
    LockClosedIcon,
    UserAddIcon,
    CogIcon,
    ChannelSettingsModal,
  },
  props: {
    channel: {
      type: Object as PropType<Channel>,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const showChannelSettingModal = ref(false)

    return { showChannelSettingModal }
  },
})
</script>
