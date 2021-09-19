<template>
  <div
    v-if="!showHeader"
    class="relative py-0.5 mt-5 hover:bg-secondary px-18"
    role="listitem"
    @mouseenter="showMessageActions = true"
    @mouseleave="showMessageActions = false"
  >
    <div
      class="relative flex flex-col justify-between"
      style="min-height: 40px"
    >
      <img
        class="absolute top-0 w-10 h-10 rounded-full select-none -left-14"
        :src="message.user.image"
      />
      <div class="flex items-baseline space-x-2">
        <p class="font-medium leading-none text-white">
          {{ message.user.username }}
        </p>
        <time :datetime="message.createdAt" class="text-xs text-muted">{{
          getTime(message.createdAt)
        }}</time>
      </div>
      <p v-if="!isEditing" class="leading-snug whitespace-pre-wrap">
        {{ message.text }}
        <time
          v-if="message.createdAt !== message.updatedAt"
          class="ml-px text-xs text-muted"
          :datetime="message.updatedAt"
          :aria-label="getTime(message.updatedAt)"
          :title="getTime(message.updatedAt)"
          >(edited)</time
        >
      </p>
      <div v-else class="mt-2">
        <div
          ref="textareaEl"
          contenteditable="true"
          class="rounded caret-gray-300 py-2.5 px-4 bg-textarea"
        ></div>
        <p class="my-2 text-xs">
          escape to
          <button class="text-link hover:underline" @click="cancelEditMessage">
            cancel
          </button>
          • enter to
          <button class="text-link hover:underline" @click="submitEditMessage">
            save
          </button>
        </p>
      </div>
    </div>
    <MessageActions
      v-if="showMessageActions && isAuthor"
      @edit="enableEdit"
      @delete="showDeleteMessageModal = true"
    />
  </div>
  <div
    v-else
    class="relative group px-18 hover:bg-secondary"
    role="listitem"
    @mouseenter="showMessageActions = true"
    @mouseleave="showMessageActions = false"
  >
    <div clas="flex items-center" :class="isEditing && 'py-2'">
      <time
        :datetime="message.createdAt"
        class="absolute hidden text-xs -translate-y-1/2 select-none  top-1/2 left-4 group-hover:inline-block text-muted"
        >{{ getShortenedTime(message.createdAt) }}</time
      >
      <p v-if="!isEditing" class="leading-snug whitespace-pre-wrap">
        {{ message.text }}
        <time
          v-if="message.createdAt !== message.updatedAt"
          class="ml-px text-xs text-muted"
          :datetime="message.updatedAt"
          :aria-label="getTime(message.updatedAt)"
          :title="getTime(message.updatedAt)"
          >(edited)</time
        >
      </p>
      <div v-else class="mt-2">
        <div
          ref="textareaEl"
          contenteditable="true"
          class="rounded caret-gray-300 py-2.5 px-4 bg-textarea"
        ></div>
        <p class="my-2 text-xs">
          escape to
          <button class="text-link hover:underline" @click="cancelEditMessage">
            cancel
          </button>
          • enter to
          <button class="text-link hover:underline" @click="submitEditMessage">
            save
          </button>
        </p>
      </div>
      <MessageActions
        v-if="showMessageActions && isAuthor"
        @edit="enableEdit"
        @delete="showDeleteMessageModal = true"
      />
    </div>
  </div>
  <DeleteMessageModal
    v-if="showDeleteMessageModal"
    v-model="showDeleteMessageModal"
    :message="message"
    @delete="deleteMessage(message.id)"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  nextTick,
  onBeforeUnmount,
  PropType,
} from 'vue'
import { getShortenedTime, getTime } from '@/helpers'
import { deleteMessage, editMessage } from '@/api/handler/messages'
import { useUser } from '@/stores/user'
import { Message } from '@/types'
import DeleteMessageModal from '@/components/modals/DeleteMessageModal.vue'
import MessageActions from '@/components/MessageActions.vue'

export default defineComponent({
  name: 'MessageItem',
  components: { DeleteMessageModal, MessageActions },
  props: {
    message: {
      type: Object as PropType<Message>,
      required: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const showDeleteMessageModal = ref(false)
    const showMessageActions = ref(false)
    const userStore = useUser()

    const isAuthor = computed(() => {
      return userStore.current?.id === props.message.user.id
    })

    const isEditing = ref(false)
    const textareaEl = ref<HTMLDivElement>()

    function enableEdit() {
      isEditing.value = true
      nextTick(() => {
        if (textareaEl.value) {
          textareaEl.value.focus()
          textareaEl.value.innerText = props.message.text
          // set caret at the end
          if (
            typeof window.getSelection != 'undefined' &&
            typeof document.createRange != 'undefined'
          ) {
            let range = document.createRange()
            range.selectNodeContents(textareaEl.value)
            range.collapse(false)
            let sel = window.getSelection()
            sel?.removeAllRanges()
            sel?.addRange(range)
          }
        }
      })
      document.addEventListener('keydown', handleKeydownEvent)
    }

    function handleKeydownEvent(e: KeyboardEvent) {
      if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitEditMessage()
      }

      if (e.code === 'Escape') {
        cancelEditMessage()
      }
    }

    function submitEditMessage() {
      const text = textareaEl.value?.innerText
      if (!text || !text.trim() || text === props.message.text) {
        cancelEditMessage()
        return
      }
      editMessage(props.message.id, text.trim())
      cancelEditMessage()
    }

    function cancelEditMessage() {
      isEditing.value = false
      document.removeEventListener('keydown', handleKeydownEvent)
    }

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydownEvent)
    })

    function test(e: any) {
      console.log(e)
      showMessageActions.value = false
    }

    return {
      test,
      getShortenedTime,
      getTime,
      showDeleteMessageModal,
      deleteMessage,
      showMessageActions,
      isAuthor,
      isEditing,
      enableEdit,
      textareaEl,
      submitEditMessage,
      cancelEditMessage,
    }
  },
})
</script>
