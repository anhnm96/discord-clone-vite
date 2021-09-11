<template>
  <button
    v-if="active"
    type="button"
    class="fixed inset-0 w-full cursor-default"
    arial-label="close"
    @click="active = false"
  />
  <div
    v-bind="$attrs"
    class="dropdown"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
  >
    <button
      :id="id"
      ref="dropdownTrigger"
      class="dropdown-trigger"
      :class="[triggerClass, { 'cursor-not-allowed': disabled }]"
      aria-haspopup="true"
      :aria-expanded="active"
      :disabled="disabled"
      @click="onClick"
      @contextmenu.prevent="onContextMenu"
    >
      <slot name="trigger" :active="active" />
    </button>
    <transition :name="animation">
      <div
        v-if="active"
        v-trap-focus
        class="dropdown-menu"
        role="listbox"
        :aria-labelledby="id"
        :aria-multiselectable="multiple"
      >
        <div
          class="
            absolute
            w-48
            mt-2
            origin-top
            rounded
            shadow
            dropdown-content
            bg-floating
          "
          :style="containerStyle"
        >
          <slot name="dropdown" :active="active" :toggle="toggle" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue'
import trapFocus from '@/directives/trapFocus'

export default defineComponent({
  name: 'VDropdown',
  directives: { 'trap-focus': trapFocus },
  props: {
    triggerClass: {
      type: String,
      default: '',
    },
    containerStyle: {
      type: String,
      default: '',
    },
    animation: {
      type: String,
      default: 'fade',
    },
    triggers: {
      type: Array,
      default: () => ['click'],
    },
    multiple: {
      type: Boolean,
      default: null,
    },
    disabled: Boolean,
  },
  setup(props) {
    /** trigger button */
    const dropdownTrigger = ref()
    const id = `VDropdown__${new Date().getTime()}--trigger`
    // trigger event setup
    const onClick = () => {
      if (props.triggers.indexOf('click') < 0) return
      toggle()
    }
    const onContextMenu = () => {
      if (props.triggers.indexOf('contextmenu') < 0) return
      toggle()
    }
    const onHover = (val: boolean) => {
      if (props.triggers.indexOf('hover') < 0) return
      toggle(val)
    }
    const toggle = (val?: boolean) => {
      if (props.disabled) return
      if (val !== undefined) active.value = val
      else active.value = !active.value
    }
    /** dropdown popup */
    const active = ref(false)
    function keyPress({ key }: KeyboardEvent) {
      if (active.value && (key === 'Escape' || key === 'Esc')) {
        active.value = false
      }
    }
    // re-focus button trigger when close
    watch(active, (newActive) => {
      if (!newActive) nextTick(() => dropdownTrigger.value.focus())
    })

    onMounted(() => {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', keyPress)
      }
    })
    onBeforeUnmount(() => {
      document.removeEventListener('keyup', keyPress)
    })
    return {
      dropdownTrigger,
      id,
      onClick,
      onContextMenu,
      onHover,
      toggle,
      active,
    }
  },
})
</script>
<style scoped>
.dropdown {
  @apply relative inline-flex;
}
.dropdown-menu {
  top: 100%;
}
.dropdown-content {
  @apply py-1.5 px-2;
}
</style>
