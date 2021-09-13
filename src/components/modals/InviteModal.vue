<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="max-w-md px-6 py-4 mx-auto space-y-4 rounded-md  bg-primary text-hover"
      style="width: 70vw"
    >
      <header class="flex items-center justify-between">
        <ModalTitle class="text-xl font-bold uppercase"
          >Invite friends to {{ guild?.name }}</ModalTitle
        >
        <button
          class="grid flex-shrink-0 w-8 h-8  place-items-center hover:bg-modifier-selected"
          aria-label="close"
          @click="close"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </header>
      <main class="space-y-4">
        <p class="text-xs font-bold uppercase">
          Send a server invite link to a friend
        </p>
        <div class="relative flex-auto rounded">
          <input
            class="w-full py-2 pl-4 pr-16 outline-none bg-secondary-alt"
            type="text"
            :value="inviteLink"
            disabled
          />
          <button
            type="button"
            class="absolute px-2 py-1 text-white transition -translate-y-1/2 rounded  right-1 top-1/2"
            :class="[
              hasCopied ? 'bg-green-500' : 'bg-purple hover:bg-purple-dark',
            ]"
            @click="copyToClipboard"
          >
            {{ hasCopied ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <p class="text-xs">
          Your invite link expires in 1 day and can only be used once
        </p>
      </main>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { XIcon } from '@heroicons/vue/outline'
import { getInviteLink } from '@/api/handler/guilds'
import { useGetCurrentGuild } from '@/hooks/useGetCurrentGuild'

export default defineComponent({
  name: 'InviteModal',
  components: { XIcon, Modal, ModalTitle },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    const route = useRoute()
    const guildId = route.params.guildId as string
    const hasCopied = ref(false)
    const inviteLink = ref('')
    const guild = useGetCurrentGuild(guildId)

    async function fetchLink() {
      const { data } = await getInviteLink(guildId)
      if (data) {
        inviteLink.value = data
      }
    }
    fetchLink()

    function copyToClipboard() {
      const cb = navigator.clipboard
      if (!inviteLink.value) return
      cb.writeText(inviteLink.value).then(() => {
        hasCopied.value = true
        setTimeout(() => {
          hasCopied.value = false
        }, 2000)
      })
    }

    return { hasCopied, guild, copyToClipboard, inviteLink }
  },
})
</script>

<style></style>
