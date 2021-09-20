<template>
  <div
    class="px-1 text-xs font-semibold text-center text-white bg-red-500 rounded-lg "
    style="min-width: 16px; min-height: 16px"
  >
    {{ count }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PingIcon',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
})
</script>

<style></style>
