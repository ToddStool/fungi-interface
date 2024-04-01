<template>
  <div class="meta-modal">
    <div v-html="item.svg" class="meta-modal__image" />

    <div class="meta-modal__title">
      Fungi <NumberText>{{ item.seed.seed }}</NumberText>
    </div>

    <div v-for="[key, value] of Object.entries(item.meta)" class="meta-modal__point">
      <div class="meta-modal__point-title">{{ camelCaseToWords(key) }}</div>
      <div class="meta-modal__point-value">{{ value || '0' }}</div>
    </div>

    <div class="meta-modal__point">
      <div class="meta-modal__point-title">Owner</div>
      <a
          :href="`https://basescan.org/address/${item.seed.owner}`"
          class="meta-modal__point-value"
      >
        {{ shortAddress(item.seed.owner) }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { camelCaseToWords } from '@/utils/string'
import { shortAddress } from '@/utils/address'

defineProps({
  item: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped lang="sass">
.meta-modal
  display: flex
  flex-direction: column
  gap: 8px

  &__image
    margin-bottom: 12px

  &__title
    font-size: 26px
    font-weight: 600
    margin-bottom: 8px

  &__point
    display: flex
    gap: 12px

    &-title
      font-weight: 600

    &-value
      color: inherit
</style>