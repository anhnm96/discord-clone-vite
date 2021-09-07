<template>
  <div
    v-if="state.show"
    class="fixed inset-0 z-50 grid bg-black bg-opacity-50 place-items-center"
  >
    <div
      class="w-4/5 max-w-sm overflow-hidden -translate-y-1/2 rounded-lg  bg-primary"
    >
      <div class="pt-4 space-y-4">
        <header v-if="state.title" class="px-4">
          <h2 class="font-bold uppercase">{{ state.title }}</h2>
        </header>
        <main class="px-4">
          <p>{{ state.content }}</p>
        </main>
        <footer class="flex justify-end px-4 py-4 space-x-2 bg-secondary">
          <button
            class="px-4 py-2 text-white bg-transparent hover:underline"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 text-white transition bg-red-500 rounded-md  hover:bg-red-600"
            @click="confirm"
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialog } from './useDialog'

export default defineComponent({
  name: 'Dialog',
  setup() {
    const { state, cancel, confirm } = useDialog()

    return { state, cancel, confirm }
  },
})
</script>
