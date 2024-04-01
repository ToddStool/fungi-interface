<template>
  <span class="number">
    <span v-html="number"></span>
  </span>
</template>

<script setup>
import { formatNumberWithComma } from '@/utils/number'
import { onMounted, ref, watch, useSlots, computed } from 'vue'

const slots = useSlots()
const number = ref(null)
const isNegative = ref(false)
const slotContent = computed(() => slots.default?.()?.[0]?.children || 0)

watch(() => slotContent.value, formatNumber)
onMounted(formatNumber)

function formatNumber() {
  if (
      !slotContent.value
      && slotContent.value !== 0
  ) {
    return
  }

  if (slotContent.value < 0) {
    isNegative.value = true
  }

  number.value = formatNumberWithComma(slotContent.value)
}
</script>

<style scoped lang="sass">
.number
  overflow-wrap: anywhere
  display: inline-block

  span
    overflow-wrap: anywhere

  small
    font-size: 50%
    position: relative
    bottom: -0.125rem
</style>