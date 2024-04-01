<template>
  <div class="select-tabs">
    <div
        v-for="option in options"
        :key="option.id"
        class="select-tabs__tab"
        :class="{ '--active': option.id === modelValue.id }"
        @click="onOptionClick(option)"
    >{{ option.title }}</div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: Object,
    required: true,
  },

  options: {
    type: Array,
    required: true,
  },
})

function onOptionClick(option) {
  emit('update:modelValue', option)
}
</script>

<style scoped lang="sass">
.select-tabs
  display: flex
  justify-content: space-between
  gap: 6px
  background-color: $mainColor
  padding: 4px
  border: 1px solid $borderColor
  box-sizing: content-box
  overflow-y: auto
  scrollbar-width: none
  width: fit-content

  &::-webkit-scrollbar
    display: none

  &__tab
    display: flex
    align-items: center
    justify-content: center
    user-select: none
    cursor: pointer
    font-size: 16px
    font-weight: 500
    white-space: nowrap
    padding: 6px 12px
    color: black
    width: inherit
    width: -webkit-fill-available
    text-align: center
    background-color: transparent
    transition: all 0.2s linear

    &:hover
      background-color: $borderColor

    &.--active
      background-color: black
      color: $mainColor
</style>