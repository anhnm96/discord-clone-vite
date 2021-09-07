<template>
  <div class="flex h-screen">
    <nav class="w-18 py-3 flex-shrink-0 bg-[#202225]">
      <div class="relative flex justify-center">
        <div
          class="absolute left-0 w-1 h-10 -translate-y-1/2 bg-white  top-1/2 rounded-tr-md rounded-br-md"
        />
        <router-link
          to="/channels/me"
          class="flex items-center justify-center w-12 h-12 text-white  rounded-2xl bg-purple"
        >
          <img src="/src/assets/me.svg" alt="logo" class="w-7 h-7" />
        </router-link>
      </div>
      <div class="bg-divider h-0.5 w-8 mx-auto my-3" />
      <div>
        <ul>
          <li>
            <NavChannel v-slot="{ classes }">
              <button :class="classes">
                <PlusIcon class="w-5 h-5" />
              </button>
            </NavChannel>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex flex-grow">
      <div class="flex flex-col flex-shrink-0 w-60">
        <nav class="flex-grow p-2 bg-secondary">
          <router-link
            to="/channels/me"
            class="flex items-center px-3 py-3 space-x-3 rounded bg-active"
          >
            <UsersIcon class="w-6 h-6" />
            <p class="font-semibold">Friends</p>
          </router-link>
          <h2
            class="flex items-center justify-between mt-4 text-xs font-bold text-gray-400 uppercase  hover:text-gray-300"
          >
            <span>Direct Messages</span>
            <PlusIcon class="w-4 h-4" />
          </h2>
        </nav>
        <section class="bg-secondary-alt">
          <div class="flex items-center px-2 space-x-2 h-13">
            <div class="relative grid flex-shrink-0 w-8 h-8">
              <img
                class="rounded-full"
                src="/src/assets/discord.png"
                alt="avatar"
              />
              <div
                class="absolute grid w-4 h-4 rounded-full  -translate-x-1/3 -translate-y-1/3 -bottom-1/4 -right-1/4 bg-secondary-alt place-items-center"
              >
                <span class="rounded-full w-2.5 h-2.5 bg-green-500" />
              </div>
            </div>
            <div class="flex-grow overflow-hidden">
              <p class="text-sm font-bold text-white truncate">Light</p>
            </div>
            <div class="flex flex-shrink-0">
              <button
                class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-active hover:text-gray-300"
              >
                <MicrophoneIcon class="w-5 h-5" />
              </button>
              <button
                class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-active hover:text-gray-300"
              >
                <VolumeUpIcon class="w-5 h-5" />
              </button>
              <button
                class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-active hover:text-gray-300"
                aria-label="settings"
                @click="showSettings = true"
              >
                <CogIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </div>
      <router-view />
    </div>
    <Settings v-if="showSettings" @close="showSettings = false" />
    <Dialog />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/outline'
import {
  UsersIcon,
  MicrophoneIcon,
  VolumeUpIcon,
  CogIcon,
} from '@heroicons/vue/solid'
import NavChannel from '@/components/NavChannel.vue'
import Settings from '@/components/Settings.vue'
import Dialog from '@/components/base/Dialog/Dialog.vue'

export default defineComponent({
  name: 'PageHome',
  components: {
    Settings,
    NavChannel,
    Dialog,
    PlusIcon,
    UsersIcon,
    MicrophoneIcon,
    VolumeUpIcon,
    CogIcon,
  },
  setup() {
    const showSettings = ref(false)

    return { showSettings }
  },
})
</script>

<style></style>
