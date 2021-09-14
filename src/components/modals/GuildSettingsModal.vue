<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="relative max-w-md px-6 py-4 mx-auto space-y-4 rounded-md  bg-primary text-hover"
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
          >Server Overview</ModalTitle
        >
      </header>
      <Form
        v-slot="{ isSubmitting }"
        class="space-y-4"
        :validation-schema="GuildSchema"
        :initial-values="formValues"
        @submit="handleEditGuild"
      >
        <main class="space-y-4">
          <div class="flex justify-center">
            <img
              src="/src/assets/discord.png"
              class="w-24 h-24 rounded-full"
              alt="guild avatar"
            />
          </div>
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-bold uppercase" for="name"
              >Server name</label
            >
            <Field
              id="name"
              name="name"
              class="p-2 border rounded  bg-input hover:border-input-hover border-input"
            />
            <ErrorMessage name="name" class="text-red-400" />
          </div>
          <div class="h-px my-4 bg-divider"></div>
          <div class="space-y-2">
            <h5 class="font-semibold text-white">Additional Configuration</h5>
            <div class="flex justify-between">
              <b-button
                :loading="invalidatingInvites"
                class="px-4 py-2 transition rounded"
                :class="[
                  invalidateSuccess
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500',
                ]"
                @click="handleInvalidateInvites"
              >
                Invalidate Links
              </b-button>
              <button
                class="px-4 py-2 transition bg-gray-600 rounded  hover:bg-gray-500"
              >
                Bans
              </button>
            </div>
            <button
              class="px-4 py-2 text-red-400 hover:underline"
              @click="handleDeleteServer"
            >
              Delete Server
            </button>
          </div>
        </main>
        <footer>
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
import { defineComponent, ref, PropType } from 'vue'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { XIcon } from '@heroicons/vue/outline'
import { GuildSchema } from '@/validation/guild'
import {
  editGuild,
  invalidateInviteLinks,
  deleteGuild,
} from '@/api/handler/guilds'
import { toErrorMap } from '@/helpers'
import { Guild } from '@/types'
import { useDialog } from '@/components/base/Dialog/useDialog'

export default defineComponent({
  name: 'GuildSettingsModal',
  components: { XIcon, Modal, ModalTitle },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    guild: {
      type: Object as PropType<Guild>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formValues = {
      name: props.guild.name,
    }

    const { open } = useDialog()
    async function handleDeleteServer() {
      emit('update:modelValue', false)
      const answer = await open({
        title: `Delete server "${props.guild.name}"`,
        content: `Are you sure you want to delete "${props.guild.name}"? This cannot be undone.`,
        okText: 'Delete Server',
      })
      if (answer === 'confirm') {
        deleteGuild(props.guild.id)
      }
    }

    async function handleEditGuild(values: any, { setErrors }: any) {
      try {
        const formData = new FormData()
        formData.append('name', values.name)
        const { data } = await editGuild(props.guild.id, formData)
        if (data) {
          emit('update:modelValue', false)
        }
      } catch (err: any) {
        setErrors(toErrorMap(err))
      }
    }

    const invalidatingInvites = ref(false)
    const invalidateSuccess = ref(false)
    async function handleInvalidateInvites() {
      invalidatingInvites.value = true
      const { data } = await invalidateInviteLinks(props.guild.id)
      invalidatingInvites.value = false
      if (data) {
        console.log(data)
        invalidateSuccess.value = true
        setTimeout(() => {
          invalidateSuccess.value = false
        }, 2000)
      }
    }

    return {
      handleEditGuild,
      GuildSchema,
      formValues,
      handleInvalidateInvites,
      invalidatingInvites,
      invalidateSuccess,
      handleDeleteServer,
    }
  },
})
</script>
