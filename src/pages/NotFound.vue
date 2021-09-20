<template>
  <div class="flex items-center justify-center h-screen bg-white">
    <div class="max-w-lg space-y-2">
      <div class="font-bold text-center text-black text-9xl">404</div>
      <h4 class="text-2xl font-bold text-gray-500 uppercase">
        Wizards behind curtains?
      </h4>
      <p class="font-semibold text-center text-gray-500">
        Click
        <router-link class="text-purple" to="/channels/me">here</router-link> to
        return.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
})
</script>

<style></style>
