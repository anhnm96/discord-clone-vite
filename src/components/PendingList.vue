<template>
  <div v-if="requests">
    <div
      v-if="requests.length === 0"
      class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
    >
      <p class="select-none">There are no pending friend requests</p>
    </div>
    <ul v-if="requests.length > 0" class="space-y-2">
      <p class="text-sm font-semibold uppercase">
        Pending - {{ requests.length }}
      </p>
      <li
        v-for="request in requests"
        :key="request.id"
        class="p-3 rounded-md hover:bg-secondary"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img
              class="w-8 h-8 rounded-full"
              :src="request.image"
              alt="avatar"
            />
            <div>
              <p class="font-semibold">{{ request.username }}</p>
              <p class="text-sm font-medium">
                {{
                  request.type === 1
                    ? 'Incoming Friend Request'
                    : 'Outgoing Friend Request'
                }}
              </p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              v-if="request.type === 1"
              aria-label="accept"
              class="grid w-10 h-10 rounded-full  hover:bg-gray-600 place-items-center bg-modifier-selected"
              @click="acceptRequest(request)"
            >
              <CheckIcon class="w-5 h-5" />
            </button>
            <button
              aria-label="decline"
              class="grid w-10 h-10 rounded-full  hover:bg-gray-600 place-items-center bg-modifier-selected"
              @click="declineRequest(request)"
            >
              <XIcon class="w-5 h-5" />
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
import { CheckIcon, XIcon } from '@heroicons/vue/outline'
import {
  getPendingRequests,
  acceptFriendRequest,
  declineFriendRequest,
} from '@/api/handler/account'
import { useHome } from '@/stores/home'
import { rKey, fKey } from '@/helpers'
import { FriendRequest } from '@/types'

export default defineComponent({
  name: 'PendingList',
  components: { CheckIcon, XIcon },
  setup() {
    const { data: requests } = useQuery<FriendRequest[]>('requests', () =>
      getPendingRequests().then((res) => res.data)
    )
    // reset requestCount when pending list is shown
    const homeStore = useHome()
    homeStore.reset()

    const cache = useQueryClient()

    const acceptRequest = async (request: FriendRequest) => {
      const { data } = await acceptFriendRequest(request.id)
      if (data) {
        cache.setQueryData(rKey, (d: any) => {
          return d?.filter((r: FriendRequest) => r.id !== request.id)
        })
        await cache.invalidateQueries(fKey)
      }
    }

    const declineRequest = async (request: FriendRequest) => {
      const { data } = await declineFriendRequest(request.id)
      if (data) {
        cache.setQueryData(rKey, (d: any) => {
          console.log(d)
          return d?.filter((r: FriendRequest) => r.id !== request.id)
        })
      }
    }

    return { requests, acceptRequest, declineRequest }
  },
})
</script>

<style></style>
