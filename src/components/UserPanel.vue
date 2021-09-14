<template>
  <section class="bg-secondary-alt">
    <div class="flex items-center px-2 space-x-2 h-13">
      <Avatar :img="userStore.current?.image" :is-online="true" />
      <div class="flex-grow overflow-hidden">
        <p class="text-sm font-bold text-white truncate">
          {{ userStore.current?.username }}
        </p>
      </div>
      <div class="flex flex-shrink-0">
        <button
          class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-modifier-selected hover:text-gray-300"
        >
          <MicrophoneIcon class="w-5 h-5" />
        </button>
        <button
          class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-modifier-selected hover:text-gray-300"
        >
          <VolumeUpIcon class="w-5 h-5" />
        </button>
        <button
          class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-modifier-selected hover:text-gray-300"
          aria-label="settings"
          @click="showSettings = true"
        >
          <CogIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </section>
  <teleport to="body">
    <Settings v-if="showSettings" @close="showSettings = false" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MicrophoneIcon, VolumeUpIcon, CogIcon } from '@heroicons/vue/solid'
import { useUser } from '@/stores/user'
import Settings from '@/components/Settings.vue'

export default defineComponent({
  name: 'UserPanel',
  components: { Settings, MicrophoneIcon, VolumeUpIcon, CogIcon },
  setup() {
    const showSettings = ref(false)
    const userStore = useUser()

    return { userStore, showSettings }
  },
})
</script>

<style></style>
