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
          <ul class="mt-2">
            <li
              v-for="dm in dms"
              :key="dm.id"
              class="flex justify-between px-2 py-1  group hover:bg-modifier-hover hover:text-hover"
            >
              <div class="flex items-center space-x-2">
                <Avatar :img="dm.user.image" :is-online="dm.user.isOnline" />
                <p class="truncate">{{ dm.user.username }}</p>
              </div>
              <button
                class="hidden group-hover:block"
                aria-label="remove dm"
                @click="handleCloseDM(dm)"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </li>
          </ul>
        </nav>
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
import { useRouter, useRoute } from 'vue-router'
import { PlusIcon, XIcon } from '@heroicons/vue/outline'
import {
  UsersIcon,
  MicrophoneIcon,
  VolumeUpIcon,
  CogIcon,
} from '@heroicons/vue/solid'
import { useQuery, useQueryClient } from 'vue-query'
import { dmKey } from '@/helpers'
import { getUserDMs, closeDirectMessage } from '@/api/handler/dm'
import NavChannel from '@/components/NavChannel.vue'
import Settings from '@/components/Settings.vue'
import Dialog from '@/components/base/Dialog/Dialog.vue'
import { useUser } from '@/stores/user'
import { DirectMessage } from '@/types'

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
    XIcon,
  },
  setup() {
    const cache = useQueryClient()
    const router = useRouter()
    const route = useRoute()
    const userStore = useUser()
    const showSettings = ref(false)
    const { data: dms } = useQuery<DirectMessage[]>(dmKey, () =>
      getUserDMs().then((res) => res.data)
    )

    async function handleCloseDM(dm: DirectMessage) {
      await closeDirectMessage(dm.id)
      cache.setQueryData(dmKey, (d: any) => {
        return d?.filter((channel: DirectMessage) => channel.id !== dm.id)
      })
      if (route.path === `/channels/me/${dm.id}`) {
        router.replace('/channels/me')
      }
    }

    return { userStore, showSettings, dms, handleCloseDM }
  },
})
</script>

<style></style>
