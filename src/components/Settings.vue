<template>
  <div class="absolute inset-0">
    <div class="z-50 flex w-full h-full">
      <nav class="flex-shrink-0 w-56 px-5 py-15 bg-secondary">
        <div>
          <section>
            <h3 class="pb-1.5 px-2 text-xs font-bold uppercase">
              User Settings
            </h3>
            <div class="space-y-0.5">
              <p class="p-2 hover:text-hover hover:bg-modifier-hover">
                My account
              </p>
              <p class="p-2 hover:text-hover hover:bg-modifier-hover">
                User profile
              </p>
            </div>
          </section>
          <div class="bg-divider px-2 h-0.25 my-2" />
          <section>
            <button
              class="w-full p-2 text-left text-red-500 hover:bg-modifier-hover"
              @click="handleLogout"
            >
              Log out
            </button>
          </section>
        </div>
      </nav>
      <div class="flex flex-auto bg-primary">
        <main class="px-10 pb-20 pt-15 max-w-3xl min-w-[460px]">
          <div>
            <section class="space-y-5">
              <h2 class="text-xl font-semibold text-white">My account</h2>
              <div class="overflow-hidden rounded-lg">
                <div class="h-24 bg-purple" />
                <div class="px-4 pb-2 bg-tertiary">
                  <div class="flex items-center space-x-4 -translate-y-6">
                    <div
                      class="relative rounded-full border-8 border-[#202225]"
                    >
                      <img
                        class="w-20 h-20 rounded-full"
                        :src="user?.image"
                        alt="avatar"
                      />
                      <div
                        class="absolute bottom-0 right-0 grid w-6 h-6 rounded-full  place-items-center bg-tertiary"
                      >
                        <div class="w-4 h-4 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <div class="flex items-center justify-between flex-auto">
                      <h3 class="text-xl font-semibold text-white">
                        {{ user?.username }}
                      </h3>
                      <button
                        class="px-4 py-2 text-sm font-semibold text-white rounded  translate-y-1/4 bg-purple"
                      >
                        Edit profile
                      </button>
                    </div>
                  </div>
                  <section
                    class="p-4 space-y-6 -translate-y-2 rounded-lg bg-secondary"
                  >
                    <!-- username -->
                    <div class="flex items-center">
                      <div class="flex-auto">
                        <h4 class="text-xs font-semibold uppercase">
                          Username
                        </h4>
                        <p class="text-white">{{ user?.username }}</p>
                      </div>
                      <button
                        class="
                          text-white text-sm
                          font-semibold
                          px-4
                          py-2
                          rounded
                          bg-[#4f545c]
                        "
                      >
                        Edit
                      </button>
                    </div>
                    <!-- email -->
                    <div class="flex items-center">
                      <div class="flex-auto">
                        <h4 class="text-xs font-semibold uppercase">Email</h4>
                        <p class="text-white">{{ user?.email }}</p>
                      </div>
                      <button
                        class="
                          text-white text-sm
                          font-semibold
                          px-4
                          py-2
                          rounded
                          bg-[#4f545c]
                        "
                      >
                        Edit
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </section>
            <div class="bg-divider h-0.25 my-10" />
            <section class="space-y-5">
              <h2 class="text-xl font-semibold text-white">
                Password and authentication
              </h2>
              <div class="space-y-5">
                <button
                  class="px-4 py-2 text-sm font-semibold text-white rounded  bg-purple"
                >
                  Change password
                </button>
                <div class="space-y-3">
                  <h4 class="text-xs font-semibold uppercase">
                    Two-factor authentication
                  </h4>
                  <p>
                    Protect your Discord account with an extra layer of
                    security. Once configured, you'll be required to enter both
                    your password and an authentication code from your mobile
                    phone in order to sign in.
                  </p>
                  <button
                    class="px-4 py-2 text-sm font-semibold text-white rounded  bg-purple"
                  >
                    Enable two-factor auth
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
        <div class="flex flex-col items-center space-y-2 pt-15">
          <button
            aria-label="close"
            class="text-primary"
            @click="$emit('close')"
          >
            <XCircleIcon class="w-9 h-9" />
          </button>
          <span class="text-sm select-none" aria-hidden="true">ESC</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { XCircleIcon } from '@heroicons/vue/outline'
import { useQuery, useQueryClient } from 'vue-query'
import { logout as logoutApi } from '@/api/handler/auth'
import { getAccount } from '@/api/handler/account'
import { useUser } from '@/stores/user'

export default defineComponent({
  name: 'Settings',
  components: { XCircleIcon },
  emits: ['close'],
  setup() {
    const cache = useQueryClient()
    const router = useRouter()
    const userStore = useUser()

    const { data: user } = useQuery('account', () =>
      getAccount().then((res) => res.data)
    )

    async function handleLogout() {
      const { data } = await logoutApi()
      if (data) {
        cache.clear()
        userStore.logout()
        router.push('/')
      }
    }

    return { handleLogout, user }
  },
})
</script>

<style></style>
