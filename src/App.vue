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
let user = localStorage.getItem('user') || ''
if (user) {
  user = JSON.parse(user)
  const userStore = useUser()
  userStore.setUser(user)
}

// setup vue-query
useQueryProvider()
</script>

<style></style>
