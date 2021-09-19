<template>
  <div class="absolute right-0 z-10 pl-8 pr-18 -top-6">
    <div class="flex rounded bg-primary shadow-msg">
      <button
        class="grid w-8 h-8  hover:text-hover hover:bg-modifier-hover place-items-center"
        @click="$emit('edit')"
      >
        <PencilIcon class="w-4 h-4" />
      </button>
      <button
        class="grid w-8 h-8  hover:text-hover hover:bg-modifier-hover place-items-center"
        @click="$emit('delete')"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'MessageActions',
  components: { PencilIcon, TrashIcon },
  emits: ['edit', 'delete'],
})
</script>

<style></style>
