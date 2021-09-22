const mounted = (el: HTMLElement) => {
  setTimeout(() => {
    el.focus()
  }, 300)
}

export default {
  mounted,
}
