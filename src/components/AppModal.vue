<template>
  <div v-if="modal" class="modal">
    <div ref="content" class="modal__content">
      <div class="modal__close" @click="onCloseClick">x</div>
      <Component :is="modal" v-bind="layoutStore.modalProps" @closeModal="onCloseClick" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { useLayoutStore } from '@/stores'
import { onClickOutside } from '@vueuse/core'

const layoutStore = useLayoutStore()
const content = ref(null)
const modal = computed(() => {
  const modalName = layoutStore.modalName

  if (!modalName) {
    return null
  }

  return defineAsyncComponent(() => import(`@/components/modals/Modal${modalName}.vue`))
})

onClickOutside(content, onCloseClick)

function onCloseClick() {
  layoutStore.closeModal()
}
</script>

<style scoped lang="sass">
$backgroundDark: rgba(1, 1, 1, 0.5)
$maxContentWidth: 428px

.modal
  position: fixed
  color: black
  z-index: 10
  width: 100%
  height: 100%
  bottom: 0
  right: 0
  padding: 16px
  animation: fadeIn 350ms ease
  overflow-y: auto
  display: flex
  align-items: center
  justify-content: center
  background-color: $backgroundDark
  cursor: pointer

  &__content
    display: flex
    flex-direction: column
    position: relative
    height: auto
    width: 100%
    max-width: $maxContentWidth
    padding: 24px
    background-color: $mainColor
    margin: auto
    cursor: auto

  &__close
    position: absolute
    top: -12px
    right: -12px
    font-size: 24px
    cursor: pointer
    padding-left: 4px
    height: 30px
    width: 30px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    user-select: none
    transition: opacity 0.5s ease
    background-color: $mainColor

    &:hover
      opacity: 0.7

  @media screen and (max-width: $breakpointMobile)
    min-width: unset
    min-height: unset
    padding: 16px
</style>