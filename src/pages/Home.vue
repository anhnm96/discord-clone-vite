<template>
  <div class="text-red-500">
    Home {{ userStore.current }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUser } from '@/stores/user'

export default defineComponent({
  name: 'PageHome',
  setup() {
    const userStore = useUser()
    return { userStore }
  },
})
</script>

<style>
</style>
