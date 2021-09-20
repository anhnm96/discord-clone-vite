<template>
  <div class="grid h-screen bg-secondary place-items-center">
    <video autoplay loop>
      <source src="/src/assets/loading.webm" type="video/webm" />
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQueryClient } from 'vue-query'
import { gKey } from '@/helpers'
import { joinGuild } from '@/api/handler/guilds'

export default defineComponent({
  name: 'Invite',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const link = route.params.link as string
    const cache = useQueryClient()

    onMounted(() => {
      async function handleJoin() {
        try {
          const { data } = await joinGuild({ link })
          if (data) {
            cache.invalidateQueries(gKey)
            router.push(`/channels/${data.id}/${data.default_channel_id}`)
          }
        } catch {
          router.replace({ name: 'NotFound' })
        }
      }
      handleJoin()
    })
  },
})
</script>

<style></style>
