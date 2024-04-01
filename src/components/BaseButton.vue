<template>
  <button class="button-component">
    <UniversalImage v-if="icon" :src="icon" class="button-component__icon" />
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
  },
})
</script>

<style scoped lang="sass">
.button-component
  color: black
  font-size: 18px
  padding: 8px 18px 8px 12px
  cursor: pointer
  border-radius: 0
  border: 1px solid $borderColor
  transition: opacity 350ms ease
  display: flex
  align-items: center
  justify-content: center
  background-color: $mainColor
  user-select: none

  &:hover
    opacity: 0.5

  &__icon
    margin-right: 16px
    image-rendering: pixelated
    height: 24px
    width: 24px

  @media screen and (max-width: $breakpointMobile)
    &__icon
      height: 20px
      width: 20px
      margin-right: 12px
</style>