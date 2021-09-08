<template>
  <div v-if="showHeader" class="relative flex items-start">
    <img
      class="absolute top-0 w-10 h-10 -translate-x-full rounded-full -left-4"
      :src="message.user.image"
    />
    <p class="font-medium leading-none text-white">
      {{ message.user.username }}
    </p>
  </div>
  <p>{{ message.text }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageItem',
  props: {
    message: {
      type: Object,
      required: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
})
</script>
