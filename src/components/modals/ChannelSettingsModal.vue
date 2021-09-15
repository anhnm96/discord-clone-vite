<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="relative max-w-md pt-4 mx-auto space-y-4 rounded-md  bg-primary text-hover"
      style="width: 70vw"
    >
      <header class="px-6 text-center">
        <button
          class="absolute grid w-8 h-8 transition-colors  right-3 top-3 place-items-center hover:text-hover"
          aria-label="close"
          @click="close"
        >
          <XIcon class="w-5 h-5" />
        </button>
        <ModalTitle class="text-2xl font-bold text-white"
          >Channel Settings</ModalTitle
        >
      </header>
      <Form
        v-slot="{ isSubmitting }"
        class="space-y-4"
        :initial-values="initialValues"
        @submit="handleEditChannel"
      >
        <main class="px-6 space-y-4">
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-bold uppercase" for="name"
              >Channel name</label
            >
            <Field
              id="name"
              name="name"
              class="p-2 border rounded  bg-input hover:border-input-hover border-input"
            />
            <ErrorMessage name="name" class="text-red-400" />
          </div>
          <div class="h-px my-4 bg-divider"></div>
          <button
            class="px-4 py-2 text-red-500 hover:underline"
            type="button"
            @click="handleDeleteChannel"
          >
            Delete Server
          </button>
        </main>
        <footer class="px-6 py-4 bg-secondary">
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              class="px-4 py-2 text-white bg-transparent rounded  hover:underline"
              @click="close"
            >
              Cancel
            </button>
            <b-button
              :loading="isSubmitting"
              type="submit"
              class="px-4 py-2 text-white transition rounded  bg-purple hover:bg-purple-dark"
            >
              Save Changes
            </b-button>
          </div>
        </footer>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { XIcon } from '@heroicons/vue/outline'
import { Channel } from '@/types'
import { editChannel, deleteChannel } from '@/api/handler/channel'
import { toErrorMap } from '@/helpers'

export default defineComponent({
  name: 'GuildSettingsModal',
  components: { XIcon, Modal, ModalTitle },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    channel: {
      type: Object as PropType<Channel>,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const initialValues = { name: props.channel.name }
    async function handleDeleteChannel() {
      emit('update:modelValue', false)
      await deleteChannel(props.guildId, props.channel.id)
    }

    async function handleEditChannel(values: any, { setErrors }: any) {
      try {
        const ids: string[] = []
        // selectedItems.map((item) => ids.push(item.value))
        const { data } = await editChannel(props.guildId, props.channel.id, {
          ...values,
          members: ids,
        })
        if (data) {
          emit('update:modelValue', false)
        }
      } catch (err: any) {
        setErrors(toErrorMap(err))
      }
    }

    return { handleDeleteChannel, handleEditChannel, initialValues }
  },
})
</script>
