<template>
  <Modal
    v-slot="{close}"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="max-w-md px-6 py-4 mx-auto space-y-4 rounded-md bg-primary text-hover"
      style="width: 70vw"
    >
      <header class="flex items-center justify-between">
        <ModalTitle class="text-xl font-bold uppercase">Add Friend</ModalTitle>
        <button
          class="grid w-8 h-8 place-items-center hover:bg-modifier-selected"
          aria-label="close"
          @click="close"
        >
          <XIcon class="w-4 h-4" />
        </button>
      </header>
      <Form
        v-slot="{isSubmitting}"
        class="space-y-4 "
        @submit="handleAddFriend"
      >
        <main class="space-y-4">
          <p>You can add a friend with their UID</p>
          <!-- uid -->
          <div class="flex items-stretch overflow-hidden border border-black rounded">
            <p class="flex items-center px-4 bg-black select-none">UID</p>
            <div class="relative flex-auto">
              <input
                class="w-full py-2 pl-4 pr-16 outline-none bg-secondary-alt"
                type="text"
                :value="userStore.current?.id"
                disabled
              >
              <button
                type="button"
                class="absolute px-2 py-1 text-white transition -translate-y-1/2 rounded right-1 top-1/2"
                :class="[hasCopied ? 'bg-green-500' : 'bg-purple hover:bg-purple-dark']"
                @click="copyToClipboard"
              >{{ hasCopied ? 'Copied' : 'Copy'}}</button>
            </div>
          </div>
          <!-- user id -->
          <div class="space-y-2">
            <label
              for="id"
              class="text-xs uppercase"
            >Enter a user id</label>
            <Field
              id="id"
              name="id"
              class="w-full py-2 pl-4 border border-black rounded outline-none bg-secondary-alt"
              type="text"
            />
            <ErrorMessage
              class="text-red-400"
              name="id"
            />
          </div>
        </main>
        <footer>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 text-white bg-transparent rounded hover:underline"
              @click="close"
            >Cancel</button>
            <button
              :disabled="isSubmitting"
              type="submit"
              class="px-4 py-2 text-white transition rounded bg-purple hover:bg-purple-dark"
            >Send Friend Request</button>
          </div>
        </footer>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQueryClient } from 'vue-query'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { XIcon } from '@heroicons/vue/outline'
import { useUser } from '@/stores/user'
import { sendFriendRequest } from '@/api/handler/account'
import { toErrorMap } from '@/helpers'

export default defineComponent({
  name: 'AddFriendModal',
  components: { XIcon, Modal, ModalTitle },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_props, { emit }) {
    const userStore = useUser()
    const hasCopied = ref(false)
    const cache = useQueryClient()

    function copyToClipboard() {
      const cb = navigator.clipboard
      if (!userStore.current) return
      cb.writeText(userStore.current.id).then(() => {
        hasCopied.value = true
        setTimeout(() => {
          hasCopied.value = false
        }, 2000)
      })
    }

    async function handleAddFriend(
      values: any,
      { setErrors }: Record<string, any>
    ) {
      if (
        !values.id ||
        values.id.length !== 20 ||
        values.id === userStore.current?.id
      ) {
        setErrors({ id: 'Please enter a valid ID' })
        return
      }
      try {
        const { data } = await sendFriendRequest(values.id)
        if (data) {
          emit('update:modelValue', false)
          cache.invalidateQueries('requests')
        }
      } catch (err) {
        setErrors(toErrorMap(err))
      }
    }

    return { userStore, copyToClipboard, hasCopied, handleAddFriend }
  },
})
</script>

<style>
</style>
