<template>
  <div>
    <div
      v-if="showHeader"
      class="relative flex items-start mb-1 px-18"
      :class="[showHeader && 'mt-4']"
    >
      <img
        class="absolute top-0 w-10 h-10 rounded-full select-none left-4"
        :src="message.user.image"
      />
      <div class="flex items-baseline space-x-2">
        <p class="font-medium leading-none text-white">
          {{ message.user.username }}
        </p>
        <p class="text-xs text-muted">{{ getTime(message.createdAt) }}</p>
      </div>
    </div>
    <p
      class="relative flex items-center px-18 group"
      :class="[!showHeader && 'hover:bg-secondary']"
    >
      <span
        v-if="!showHeader"
        class="absolute hidden text-xs translate-x-1/2 -translate-y-1/2 select-none top-1/2 place-items-center -left-2 group-hover:inline-block text-muted"
        >{{ getShortenedTime(message.createdAt) }}</span
      >
      <span>{{ message.text }}</span>
      <div class="absolute hidden group-hover:block right-8 -top-6">
        <div class="rounded shadow bg-primary">
          <button class="grid w-8 h-8 hover:text-hover hover:bg-modifier-hover place-items-center">
            <DotsHorizontalIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getShortenedTime, getTime } from '@/helpers'
import { DotsHorizontalIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'MessageItem',
  components: {DotsHorizontalIcon},
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
  setup() {
    return { getShortenedTime, getTime }
  },
})
</script>
