<template>
  <div class="relative flex justify-center">
    <div
      class="absolute left-0 w-1 h-10 -translate-y-1/2 bg-white  top-1/2 rounded-tr-md rounded-br-md"
    />
    <router-link
      :to="`/channels/${guild.id}/${guild.default_channel_id}`"
      class="flex items-center justify-center w-12 h-12 rounded-full bg-primary"
    >
      <img
        v-if="guild.icon"
        :src="guild.icon"
        alt="guild icon"
        class="w-7 h-7"
      />
      <div
        v-else
        class="grid w-full h-full font-semibold text-center transition rounded-full  place-items-center hover:text-white text-hover hover:bg-purple"
      >
        {{ guild.name[0] }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Guild } from '@/types'

export default defineComponent({
  name: 'NavChannel',
  props: {
    guild: {
      type: Object as PropType<Guild>,
      required: true,
    },
  },
})
</script>

<style></style>
