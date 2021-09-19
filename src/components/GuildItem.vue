<template>
  <div class="relative flex justify-center">
    <router-link
      :to="`/channels/${guild.id}/${guild.default_channel_id}`"
      class="flex items-center justify-center w-12 h-12 rounded-full  peer bg-primary"
      active-class="link-active"
    >
      <img
        v-if="guild.icon"
        :src="guild.icon"
        alt="guild icon"
        class="w-7 h-7"
      />
      <div
        v-else
        class="grid w-full h-full font-semibold transition rounded-full  place-items-center hover:text-white text-hover hover:bg-purple"
      >
        {{ guild.name[0] }}
      </div>
    </router-link>
    <div
      class="absolute left-0 w-1 h-2 transition-all -translate-y-1/2 bg-white  peer-hover:h-5 top-1/2 rounded-tr-md rounded-br-md"
    />
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
