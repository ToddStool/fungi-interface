<template>
  <div
      class="input"
      :class="{ '--disabled': isDisabled }"
      @click="onClick"
  >
    <input
      ref="field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      class="input__field"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
  },

  placeholder: {
    type: String,
    default: 'Write something...',
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const field = ref(null)

function onClick() {
  if (!field.value.focus) {
    return
  }

  field.value.focus()
}
</script>

<style scoped lang="sass">
.input
  padding: 12px 14px
  background-color: $mainColor
  border: 1px solid $borderColor
  transition: border-color 350ms ease, box-shadow 350ms ease, background-color 350ms ease
  display: flex
  align-items: center
  gap: 8px
  font-size: 16px

  &.--disabled
    pointer-events: none
    opacity: 0.6

  &__field
    width: 100%
    font-size: inherit

  &__icon
    height: 16px
    width: 16px
    min-height: 16px
    min-width: 16px
    margin-right: 8px

  &__symbol
    display: flex
    align-items: center
    gap: 8px
    user-select: none

    &-icon
      height: 24px
      width: 24px
      border-radius: 50%

    &-title
      font-weight: 500

  &__max
    font-size: 14px
    font-weight: 500
    cursor: pointer
    transition: opacity 400ms ease

    &:hover
      opacity: 0.6
</style>