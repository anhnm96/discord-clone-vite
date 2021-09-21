<template>
  <div class="relative">
    <img
      class="w-8 h-8 rounded-full"
      :src="img"
      :alt="`${username}, ${isOnline ? 'Online' : 'Offline'}`"
    />
    <div
      class="absolute grid w-4 h-4 rounded-full  -bottom-1/4 -right-1/4 -translate-y-1/3 -translate-x-1/3 place-items-center bg-primary"
    >
      <div v-if="isOnline" class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
      <div
        v-else
        class="w-2.5 h-2.5 rounded-full bg-gray-400 grid place-items-center"
      >
        <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    img: {
      type: String,
      required: true,
      default: '',
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    username: {
      type: String,
      default: '',
    },
  },
})
</script>

<style></style>
