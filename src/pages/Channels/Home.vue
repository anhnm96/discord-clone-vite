<template>
  <div class="flex flex-col flex-grow bg-primary">
    <section class="h-12 shadow-md">
      <div class="flex items-center h-full p-2">
        <div class="flex px-2 space-x-2">
          <UsersIcon class="w-6 h-6" />
          <h3 class="font-bold">Friends</h3>
        </div>
        <div class="bg-divider w-0.25 h-6" />
        <div class="flex space-x-2">
          <div class="py-0.5 px-2" @click="activeTab = 'Online'">Online</div>
          <div class="py-0.5 px-2" @click="activeTab = 'All'">All</div>
          <div class="py-0.5 px-2" @click="activeTab = 'Pending'">Pending</div>
          <button
            class="py-0.5 px-2 bg-green-600 text-white rounded"
            @click="showAddFriendModal = true"
          >
            Add friend
          </button>
        </div>
      </div>
    </section>
    <main class="flex flex-col flex-auto">
      <div class="relative flex-auto p-4">
        <PendingList v-if="activeTab === 'Pending'" />
        <FriendsList v-else-if="activeTab === 'All'" />
      </div>
    </main>
    <AddFriendModal v-model="showAddFriendModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PendingList from '@/components/PendingList.vue'
import FriendsList from '@/components/FriendsList.vue'
import AddFriendModal from '@/components/modals/AddFriendModal.vue'

import { UsersIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'ChannelsHome',
  components: {
    PendingList,
    FriendsList,
    AddFriendModal,
    UsersIcon,
  },
  setup() {
    const showAddFriendModal = ref(false)
    const activeTab = ref('All')

    return { showAddFriendModal, activeTab }
  },
})
</script>
