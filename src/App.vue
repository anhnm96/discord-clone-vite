<template>
  <div class="bg-tertiary">
    <router-view />
    <VueQueryDevTools />
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '@/stores/user'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'

// check login
const userStr = localStorage.getItem('user') || ''
if (userStr) {
  const user = JSON.parse(userStr)
  if (user.current !== null) {
    const userStore = useUser()
    userStore.setUser(user)
  }
}

// setup vue-query
useQueryProvider({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  },
})
</script>

<style></style>
