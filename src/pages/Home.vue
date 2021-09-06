<template>
  <div class="flex h-screen">
    <nav class="w-18 py-3 flex-shrink-0 bg-[#202225]">
      <div class="relative flex justify-center">
        <div class="absolute left-0 w-1 h-10 -translate-y-1/2 bg-white  top-1/2 rounded-tr-md rounded-br-md" />
        <router-link
          to="/channels/me"
          class="flex items-center justify-center w-12 h-12 text-white  rounded-2xl bg-purple"
        >
          <img
            src="/src/assets/me.svg"
            alt="logo"
            class="w-7 h-7"
          />
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
          <div class="flex items-center px-3 py-3 space-x-3 rounded bg-active">
            <UsersIcon class="w-6 h-6" />
            <p class="font-semibold">Friends</p>
          </div>
          <h2 class="flex items-center justify-between mt-4 text-xs font-bold text-gray-400 uppercase  hover:text-gray-300">
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
              <div class="absolute grid w-4 h-4 rounded-full  -translate-x-1/3 -translate-y-1/3 -bottom-1/4 -right-1/4 bg-secondary-alt place-items-center">
                <span class="rounded-full w-2.5 h-2.5 bg-green-500" />
              </div>
            </div>
            <div class="flex-grow overflow-hidden">
              <p class="text-sm font-bold text-white truncate">Light</p>
            </div>
            <div class="flex flex-shrink-0">
              <button class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-active hover:text-gray-300">
                <MicrophoneIcon class="w-5 h-5" />
              </button>
              <button class="grid w-8 h-8 text-gray-400 rounded  place-items-center hover:bg-active hover:text-gray-300">
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
      <div class="flex flex-col flex-grow bg-primary">
        <section class="h-12 shadow-md">
          <div class="flex items-center h-full p-2">
            <div class="flex px-2 space-x-2">
              <UsersIcon class="w-6 h-6" />
              <h3 class="font-bold">Friends</h3>
            </div>
            <div class="bg-divider w-0.25 h-6" />
            <div class="flex space-x-2">
              <div class="py-0.5 px-2">Online</div>
              <div class="py-0.5 px-2">All</div>
              <div class="py-0.5 px-2">Pending</div>
              <button
                class="py-0.5 px-2 bg-green-600 text-white rounded"
                @click="showAddFriendModal=true"
              >Add friend</button>
            </div>
          </div>
        </section>
        <main class="flex flex-col flex-auto">
          <div class="flex-auto px-4">
            <!-- intro -->
            <div class="space-y-2">
              <div>
                <img
                  class="w-20 h-20 rounded-full"
                  src="/src/assets/discord-gray.png"
                  alt="logo"
                />
              </div>
              <h1 class="text-4xl font-bold truncate select-none">
                Channel name
              </h1>
              <p class="select-none">
                This is the beginning of your direct message history with
                <b>Channel name</b>
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 px-4 pb-6">
            <div class="flex rounded-lg bg-textarea">
              <button class="self-start px-4 py-2 text-gray-400 hover:text-gray-300">
                <PlusCircleIcon class="w-6 h-6" />
              </button>
              <textarea class="flex-auto py-2 pr-2 bg-transparent outline-none resize-none "></textarea>
            </div>
          </div>
        </main>
      </div>
    </div>
    <Settings
      v-if="showSettings"
      @close="showSettings = false"
    />
    <AddFriendModal v-model="showAddFriendModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavChannel from '@/components/NavChannel.vue'
import { PlusIcon } from '@heroicons/vue/outline'
import {
  UsersIcon,
  MicrophoneIcon,
  VolumeUpIcon,
  CogIcon,
  PlusCircleIcon,
} from '@heroicons/vue/solid'
import Settings from '@/components/Settings.vue'
import AddFriendModal from '@/components/modals/AddFriendModal.vue'

export default defineComponent({
  name: 'PageHome',
  components: {
    Settings,
    AddFriendModal,
    NavChannel,
    PlusIcon,
    UsersIcon,
    MicrophoneIcon,
    VolumeUpIcon,
    CogIcon,
    PlusCircleIcon,
  },
  setup() {
    const showSettings = ref(false)
    const showAddFriendModal = ref(false)

    return { showSettings, showAddFriendModal }
  },
})
</script>

<style></style>
