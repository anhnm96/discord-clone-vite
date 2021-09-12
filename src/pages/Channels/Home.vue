<template>
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
    <UserPanel />
  </div>
  <div class="flex flex-col flex-grow h-screen bg-primary">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery, useQueryClient } from 'vue-query'
import { dmKey } from '@/helpers'
import { getUserDMs, closeDirectMessage } from '@/api/handler/dm'
import { PlusIcon, UsersIcon, XIcon } from '@heroicons/vue/solid'
import UserPanel from '@/components/UserPanel.vue'
import { DirectMessage } from '@/types'

export default defineComponent({
  name: 'ChannelsHome',
  components: {
    UserPanel,
    PlusIcon,
    UsersIcon,
    XIcon,
  },
  setup() {
    const cache = useQueryClient()
    const router = useRouter()
    const route = useRoute()

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

    return { dms, handleCloseDM }
  },
})
</script>
