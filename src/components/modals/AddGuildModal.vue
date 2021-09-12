<template>
  <Modal
    v-slot="{ close }"
    :model-value="modelValue"
    :persistent="false"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div
      class="relative w-screen max-w-md mx-auto overflow-hidden transition-all rounded-md  bg-primary text-primary"
    >
      <transition-group :name="transition">
        <div v-if="showModal === 'select'" class="pt-4">
          <button
            class="absolute grid w-8 h-8 transition-colors  right-3 top-3 place-items-center hover:text-hover"
            aria-label="close"
            @click="close"
          >
            <XIcon class="w-5 h-5" />
          </button>
          <header class="px-6 space-y-2 text-center">
            <ModalTitle class="text-2xl font-bold text-white"
              >Add a server</ModalTitle
            >
            <p>
              Your server is where you and your friends hang out. Make yours and
              start talking.
            </p>
          </header>
          <section class="px-6 mt-4">
            <button
              class="flex items-center w-full px-4 py-2 border rounded-md  border-divider hover:bg-modifier-hover"
              @click="
                () => {
                  transition = 'slide-left'
                  showModal = 'create'
                }
              "
            >
              <img
                class="w-12 h-12"
                src="/src/assets/create-guild.svg"
                alt="create guild"
              />
              <p class="ml-2 font-bold truncate text-hover">Create my own</p>
              <ChevronRightIcon class="w-5 h-5 ml-auto" />
            </button>
          </section>
          <section class="px-6 py-4 mt-4 space-y-2 bg-secondary">
            <h2 class="text-xl font-semibold text-center">
              Already have an invite?
            </h2>
            <button
              class="
                w-full
                px-4
                py-2
                text-sm text-white
                bg-[#4f545c]
                rounded
                hover:bg-[#5d6269] hover:text-white
                font-semibold
                transition
              "
              @click="
                () => {
                  transition = 'slide-left'
                  showModal = 'join'
                }
              "
            >
              Join a server
            </button>
          </section>
        </div>
        <Form
          v-else-if="showModal === 'create'"
          class="pt-4"
          @submit="createServer"
        >
          <button
            class="absolute grid w-8 h-8 transition-colors  right-3 top-3 place-items-center hover:text-hover"
            aria-label="close"
            @click="close"
          >
            <XIcon class="w-5 h-5" />
          </button>
          <header class="px-6 space-y-2 text-center">
            <ModalTitle class="text-2xl font-bold text-white"
              >Customise your server</ModalTitle
            >
            <p>
              Give your new server a personality with a name and an icon. You
              can always change it later.
            </p>
          </header>
          <section class="px-6 mt-4 space-y-4">
            <div class="flex flex-col space-y-2">
              <label for="name" class="text-xs font-bold uppercase"
                >Server name</label
              >
              <Field
                id="name"
                v-model="guildName"
                v-focus
                name="name"
                type="text"
                class="p-2 border rounded  bg-input hover:border-input-hover border-input"
              />
              <ErrorMessage class="text-red-400" name="id" />
            </div>
            <p class="text-xs text-muted">
              By creating a server, you agree to Discord's
              <b class="font-semibold text-link hover:underline"
                >Community Guidelines</b
              >.
            </p>
          </section>
          <section class="px-6 py-4 mt-4 bg-secondary">
            <div class="flex items-center justify-between">
              <button
                type="button"
                class="px-4 py-2 text-sm font-semibold text-white bg-transparent rounded  hover:underline"
                @click="
                  () => {
                    transition = 'slide-right'
                    showModal = 'select'
                  }
                "
              >
                Back
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-semibold text-white transition rounded  bg-purple hover:bg-purple-dark"
              >
                Create
              </button>
            </div>
          </section>
        </Form>
        <div v-else class="pt-4">
          <button
            class="absolute grid w-8 h-8 transition-colors  right-3 top-3 place-items-center hover:text-hover"
            aria-label="close"
            @click="close"
          >
            <XIcon class="w-5 h-5" />
          </button>
          <header class="px-6 space-y-2 text-center">
            <ModalTitle class="text-2xl font-bold text-white"
              >Join a server</ModalTitle
            >
            <p>Enter an invite below to join an existing server</p>
          </header>
          <section class="px-6 mt-4 space-y-4">
            <div class="flex flex-col space-y-2">
              <label for="link" class="text-xs font-bold uppercase"
                >Invite link</label
              >
              <input
                id="link"
                v-model="inviteLink"
                v-focus
                type="text"
                class="p-2 border rounded  bg-input hover:border-input-hover border-input"
              />
            </div>
            <div>
              <h5 class="text-xs font-bold uppercase">
                Invites should look like
              </h5>
              <p class="mt-2 text-sm text-white">hTKzmak</p>
              <p class="text-sm text-white">https://discord.gg/hTKzmak</p>
              <p class="text-sm text-white">https://discord.gg/cool-people</p>
            </div>
          </section>
          <section class="px-6 py-4 mt-4 bg-secondary">
            <div class="flex items-center justify-between">
              <button
                class="px-4 py-2 text-sm font-semibold text-white bg-transparent rounded  hover:underline"
                @click="
                  () => {
                    transition = 'slide-right'
                    showModal = 'select'
                  }
                "
              >
                Back
              </button>
              <button
                class="px-4 py-2 text-sm font-semibold text-white transition rounded  bg-purple hover:bg-purple-dark"
              >
                Join server
              </button>
            </div>
          </section>
        </div>
      </transition-group>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQueryClient } from 'vue-query'
import { XIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import { createGuild } from '@/api/handler/guilds'
import { Modal, ModalTitle } from '@/components/base/BaseModal'
import { useUser } from '@/stores/user'
import focus from '@/directives/focus'
import { toErrorMap, gKey } from '@/helpers'

export default defineComponent({
  name: 'AddGuildModal',
  components: { Modal, ModalTitle, XIcon, ChevronRightIcon },
  directives: { focus },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_props, { emit }) {
    const router = useRouter()
    const cache = useQueryClient()
    const userStore = useUser()
    const showModal = ref('select')
    const guildName = ref(`${userStore.current?.username}'s server`)
    const inviteLink = ref('')
    const transition = ref('slide-left')

    async function createServer(values: any, { setErrors }: any) {
      try {
        const { data } = await createGuild(values)
        if (data) {
          cache.setQueryData(gKey, (guilds: any) => {
            return [...guilds, data]
          })
          emit('update:modelValue', false)
          router.push(`/channels/${data.id}/${data.default_channel_id}`)
        }
      } catch (err: any) {
        setErrors(toErrorMap(err))
      }
    }

    return { showModal, guildName, inviteLink, createServer, transition }
  },
})
</script>

<style>
.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 300ms ease-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  position: absolute;
}
</style>
