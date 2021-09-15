<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="max-w-md px-6 py-4 mx-auto space-y-8 rounded-md  bg-primary text-hover"
      style="width: 70vw"
    >
      <header class="flex items-center justify-center">
        <ModalTitle class="text-xl font-bold uppercase"
          >Create channel</ModalTitle
        >
        <button
          class="absolute grid w-8 h-8 transition-colors  right-3 top-3 place-items-center hover:text-hover"
          aria-label="close"
          @click="close"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </header>
      <Form
        v-slot="{ isSubmitting }"
        class="space-y-4"
        @submit="handleCreateChannel"
      >
        <main class="space-y-4">
          <div class="space-y-2">
            <p for="type" class="text-xs uppercase">Channel type</p>
            <Field id="type" type="checkbox" name="type" class="hidden peer" />
            <label
              class="flex items-center p-3 space-x-1 rounded cursor-pointer  bg-tertiary"
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="currentColor"
                ></path>
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  class="radioIconForeground-XwlXQN"
                  fill="#939df7"
                ></circle>
              </svg>
              <HashtagIcon class="w-6 h-6" />
              <div>
                <p>Text channel</p>
                <p class="text-xs">
                  Post images, GIFs, stickers, opinions and puns
                </p>
              </div>
            </label>
          </div>
          <!-- channel name -->
          <div class="space-y-2">
            <label for="id" class="text-xs uppercase">Channel name</label>
            <div class="relative">
              <HashtagIcon
                class="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2"
              />
              <Field
                id="name"
                v-focus
                name="name"
                class="w-full py-2 pl-8 pr-2 border border-black rounded outline-none  bg-secondary-alt"
                type="text"
                placeholder="new-channel"
              />
            </div>
            <ErrorMessage class="text-red-400" name="name" />
          </div>
          <!-- <div class="space-y-2">
            <div class="flex justify-between">
              <label
                for="isPublic"
                class="flex items-center flex-grow space-x-2"
              >
                <LockClosedIcon class="w-4 h-4" />
                <span>Private channel</span>
              </label>
              <Field id="isPublic" type="checkbox" name="isPublic" />
            </div>
            <p class="text-sm">
              By making a channel private, only select members and roles will be
              able to view this channel.
            </p>
          </div> -->
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
            <button
              :disabled="isSubmitting"
              type="submit"
              class="px-4 py-2 text-white transition rounded  bg-purple hover:bg-purple-dark"
            >
              Create Channel
            </button>
          </div>
        </footer>
      </Form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuery } from 'vue-query'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { XIcon, HashtagIcon, LockClosedIcon } from '@heroicons/vue/solid'
import focus from '@/directives/focus'
import { mKey, toErrorMap } from '@/helpers'
import { getGuildMembers } from '@/api/handler/guilds'
import { createChannel } from '@/api/handler/channel'

export default defineComponent({
  name: 'AddChannelModal',
  components: { Modal, ModalTitle, XIcon, HashtagIcon, LockClosedIcon },
  directives: { focus },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    guildId: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const key = mKey(props.guildId)
    const { data: members } = useQuery(key, () =>
      getGuildMembers(props.guildId).then((res) => res.data)
    )
    const selectedItems = ref([])

    async function handleCreateChannel(values: any, { setErrors }: any) {
      try {
        const ids: string[] = []
        // selectedItems.value.map((item) => ids.push(item.id))
        const { data } = await createChannel(props.guildId, {
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

    return { handleCreateChannel }
  },
})
</script>
