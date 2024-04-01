<template>
  <div class="text-wrapper">
    <span v-html="html"></span>
    <span
        class="text-wrapper__button"
        @click="isFull = !isFull"
    >
      {{ isFull ? 'Read less' : 'Read more' }}
    </span>
  </div>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'

const props = defineProps({
  maxSymbols: {
    type: Number,
    default: 50,
  },
})

const slots = useSlots()

const isFull = ref(false)
const text = computed(() => slots.default?.()?.[0]?.children)
const html = computed(() => {
  let finalHtml = text.value

  if (!isFull.value) {
    finalHtml = finalHtml.slice(0, props.maxSymbols) + ' ...'
  }

  return finalHtml.replaceAll('/n', '<br>')
})
</script>

<style scoped lang="sass">
.text-wrapper
  &__button
    font-weight: 600
    cursor: pointer
    margin-left: 4px
</style>