<template>
  <div class="flex h-screen">
    <nav class="flex-shrink-0 py-3 w-18 bg-tertiary">
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
        <ul class="space-y-2">
          <li>
            <GuildItem v-for="guild in guilds" :key="guild.id" :guild="guild" />
          </li>
          <li>
            <div class="relative flex justify-center">
              <div
                class="absolute left-0 w-1 h-10 -translate-y-1/2 bg-white  top-1/2 rounded-tr-md rounded-br-md"
              />
              <button
                class="flex items-center justify-center w-12 h-12 text-green-500 transition ease-out rounded-full  hover:rounded-2xl hover:text-white hover:bg-green-600 bg-primary"
                @click="showAddGuildModal = true"
              >
                <PlusIcon class="w-5 h-5" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class="flex flex-grow">
      <router-view />
    </div>
    <Dialog />
    <AddGuildModal v-if="showAddGuildModal" v-model="showAddGuildModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/outline'
import GuildItem from '@/components/GuildItem.vue'
import Dialog from '@/components/base/Dialog/Dialog.vue'
import AddGuildModal from '@/components/modals/AddGuildModal.vue'
import { useGetGuildList } from '@/hooks/useGetCurrentGuild'

export default defineComponent({
  name: 'PageHome',
  components: {
    GuildItem,
    Dialog,
    AddGuildModal,
    PlusIcon,
  },
  setup() {
    const showAddGuildModal = ref(false)
    const guilds = useGetGuildList()

    return { showAddGuildModal, guilds }
  },
})
</script>

<style></style>
