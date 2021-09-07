<template>
  <div v-if="friendsList">
    <div
      v-if="friendsList.length === 0"
      class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <p class="select-none">There are no friends</p>
    </div>
    <ul v-if="friendsList.length > 0" class="space-y-2">
      <p class="text-sm font-semibold uppercase">
        All Friends - {{ friendsList.length }}
      </p>
      <li
        v-for="friend in friendsList"
        :key="friend.id"
        class="p-3 rounded-md hover:bg-secondary"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="relative">
              <img
                class="w-8 h-8 rounded-full"
                :src="friend.image"
                alt="avatar"
              />
              <div
                class="absolute grid w-4 h-4 rounded-full  -bottom-1/4 -right-1/4 -translate-y-1/3 -translate-x-1/3 place-items-center bg-primary"
              >
                <div
                  v-if="friend.isOnline"
                  class="w-2.5 h-2.5 rounded-full bg-green-500"
                ></div>
                <div
                  v-else
                  class="
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-gray-400
                    grid
                    place-items-center
                  "
                >
                  <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
            <div>
              <p class="font-semibold leading-none text-white">
                {{ friend.username }}
              </p>
              <p class="text-sm font-medium">
                {{ friend.isOnline ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              aria-label="message"
              class="grid w-10 h-10 rounded-full  hover:bg-gray-600 place-items-center bg-modifier-selected"
            >
              <ChatAltIcon class="w-5 h-5" />
            </button>
            <button
              aria-label="more"
              class="grid w-10 h-10 rounded-full  hover:bg-gray-600 place-items-center bg-modifier-selected"
              @click="handleRemoveFriend(friend)"
            >
              <DotsVerticalIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery, useQueryClient } from 'vue-query'
import { getFriends, removeFriend } from '@/api/handler/account'
import { fKey } from '@/helpers'
import { DotsVerticalIcon, ChatAltIcon } from '@heroicons/vue/solid'
import { User } from '@/types'
import { useDialog } from '@/components/base/Dialog/useDialog'

export default defineComponent({
  name: 'FriendsList',
  components: { DotsVerticalIcon, ChatAltIcon },
  setup() {
    const cache = useQueryClient()
    const { open } = useDialog()
    const { data: friendsList } = useQuery<User[]>(fKey, () =>
      getFriends().then((res) => res.data)
    )

    async function handleRemoveFriend(friend: User) {
      const answer = await open({
        title: 'Remove Friend',
        content: `Are you sure you want to permanenty remove ${friend.username} from your friends?`,
      })
      if (answer === 'cancel') return
      const { data } = await removeFriend(friend.id)
      if (data) {
        cache.setQueryData(fKey, (friends: any) => {
          return friends.filter((f: User) => f.id !== friend.id)
        })
      }
    }

    return { friendsList, handleRemoveFriend }
  },
})
</script>

<style></style>
