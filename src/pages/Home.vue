<template>
  <div class="flex h-screen overflow-hidden">
    <nav class="flex-shrink-0 py-3 w-18 bg-tertiary">
      <div class="relative flex justify-center">
        <router-link
          to="/channels/me"
          class="relative flex items-center justify-center w-12 h-12 text-white  peer rounded-2xl bg-purple"
          active-class="link-active"
        >
          <img src="/src/assets/me.svg" alt="logo" class="w-7 h-7" />
          <div
            v-if="homeStore.notiCount"
            class="absolute grid p-1 rounded-full  -bottom-1 -right-1 place-items-center bg-tertiary"
          >
            <PingIcon :count="homeStore.notiCount" />
          </div>
        </router-link>
        <div
          class="absolute left-0 w-1 h-2 transition-all -translate-y-1/2 bg-white  peer-hover:h-5 top-1/2 rounded-tr-md rounded-br-md"
        />
      </div>
      <div class="bg-divider h-0.5 w-8 mx-auto my-3" />
      <div>
        <ul class="space-y-2">
          <li v-for="guild in guilds" :key="guild.id">
            <GuildItem :guild="guild" />
          </li>
          <li>
            <div class="relative flex justify-center">
              <button
                class="flex items-center justify-center w-12 h-12 text-green-500 transition ease-out rounded-full  peer hover:rounded-2xl hover:text-white hover:bg-green-600 bg-primary"
                @click="showAddGuildModal = true"
              >
                <PlusIcon class="w-5 h-5" />
              </button>
              <div
                class="absolute left-0 w-1 h-2 transition-all -translate-y-1/2 bg-white  peer-hover:h-5 top-1/2 rounded-tr-md rounded-br-md"
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex flex-grow">
      <router-view :key="$route.path" />
    </div>
    <Dialog />
    <AddGuildModal v-if="showAddGuildModal" v-model="showAddGuildModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { PlusIcon } from '@heroicons/vue/outline'
import GuildItem from '@/components/GuildItem.vue'
import Dialog from '@/components/base/Dialog/Dialog.vue'
import AddGuildModal from '@/components/modals/AddGuildModal.vue'
import { useGetGuildList } from '@/hooks/useGetCurrentGuild'
import useGuildSocket from '@/api/ws/useGuildSocket'
import useGlobalSocket from '@/api/ws/useGlobalSocket'
import { useHome } from '@/stores/home'

export default defineComponent({
  name: 'PageHome',
  components: {
    GuildItem,
    Dialog,
    AddGuildModal,
    PlusIcon,
  },
  setup() {
    const route = useRoute()
    useGlobalSocket()
    useGuildSocket()
    const showAddGuildModal = ref(false)
    const guilds = useGetGuildList()
    const homeStore = useHome()

    watch(
      () => route.path,
      (newVal) => {
        if (newVal.startsWith('/channels/me')) {
          homeStore.reset()
        }
      }
    )

    return { showAddGuildModal, guilds, homeStore }
  },
})
</script>

<style>
.link-active + div {
  height: 40px;
}
</style>
