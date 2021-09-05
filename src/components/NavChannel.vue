<template>
  <div class="relative flex justify-center">
    <div class="absolute left-0 w-1 h-10 -translate-y-1/2 bg-white top-1/2 rounded-tr-md rounded-br-md" />
    <slot :classes="'transition ease-out hover:rounded-2xl hover:text-white hover:bg-green-600 flex items-center justify-center w-12 h-12 text-green-500 bg-primary rounded-full'">
      <router-link
        to="/channels/me"
        class="flex items-center justify-center w-12 h-12 text-green-500 rounded-full"
      >
        <img
          src="/src/assets/me.svg"
          alt="logo"
          class="w-7 h-7"
        >
      </router-link>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavChannel',
})
</script>

<style>
</style>
