<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="max-w-md pt-4 mx-auto space-y-4 overflow-hidden rounded-md  bg-primary text-hover"
      style="width: 80vw"
    >
      <header class="flex items-center justify-start px-6">
        <ModalTitle class="text-xl font-bold uppercase"
          >Delete Message</ModalTitle
        >
      </header>
      <main class="px-6 space-y-4">
        <p>Are you sure you want to delete this message?</p>
        <div class="py-2.5 rounded shadow-msg">
          <div class="relative pr-4 pl-18">
            <img
              :src="message.user.image"
              alt="avatar"
              class="absolute top-0 w-10 h-10 rounded-full left-4"
            />
            <h2 class="space-x-2 font-medium">
              <span class="text-white">{{ message.user.username }}</span>
              <time :datetime="message.createdAt" class="text-xs text-muted">{{
                getTime(message.createdAt)
              }}</time>
            </h2>
            <p>
              {{ message.text }}
            </p>
          </div>
        </div>
      </main>
      <footer class="bg-[#2f3136] py-4 px-6">
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            class="px-4 py-2 text-sm text-white bg-transparent rounded  hover:underline"
            @click="close"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm text-white transition bg-red-500 rounded  hover:bg-red-600"
            @click="deleteMessage"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getTime } from '@/helpers'
import { Modal, ModalTitle } from '@/components/base/BaseModal'

export default defineComponent({
  name: 'DeleteMessageModal',
  components: { Modal, ModalTitle },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'delete'],
  setup(_props, { emit }) {
    function deleteMessage() {
      emit('delete')
      emit('update:modelValue', false)
    }

    return { getTime, deleteMessage }
  },
})
</script>

<style></style>
