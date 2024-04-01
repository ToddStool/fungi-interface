import { defineStore } from 'pinia'

const MOBILE_BREAKPOINT_PIXELS = 778

const useLayoutStore = defineStore('layout', () => {
  return {
    isMobile: window.innerWidth <= MOBILE_BREAKPOINT_PIXELS,

    modalName: '',
    modalProps: {},

    openModal(modalName, modalProps = {}) {
      this.modalName = modalName
      this.modalProps = modalProps
    },

    closeModal() {
      this.modalName = ''
    },
  }
})

window.addEventListener('resize', () => {
  const layoutStore = useLayoutStore()
  layoutStore.isMobile = window.innerWidth <= MOBILE_BREAKPOINT_PIXELS
})

export default useLayoutStore