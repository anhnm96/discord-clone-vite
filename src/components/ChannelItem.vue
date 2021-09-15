<template>
  <router-link
    :to="`/channels/${guildId}/${channel.id}`"
    class="flex items-center px-2 py-2 rounded  bg-modifier-selected hover:bg-modifier-hover"
  >
    <HashtagIcon v-if="channel.isPublic" class="w-5 h-5 text-muted" />
    <LockClosedIcon v-else class="w-5 h-5 text-muted" />

    <p class="ml-2 font-semibold text-white truncate">{{ channel.name }}</p>
    <div class="flex items-center ml-auto space-x-1">
      <button class="" aria-label="Create invite">
        <UserAddIcon class="w-4 h-4" />
      </button>
      <button aria-label="Edit channel" @click="showChannelSettingModal = true">
        <CogIcon class="w-4 h-4" />
      </button>
    </div>
  </router-link>
  <ChannelSettingsModal
    v-if="showChannelSettingModal"
    v-model="showChannelSettingModal"
    :channel="channel"
    :guild-id="guildId"
  />
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
  },
  setup() {
    const showChannelSettingModal = ref(false)

    return { showChannelSettingModal }
  },
})
</script>
