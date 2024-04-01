<template>
  <div class="inscription-list">
    <div
        v-for="inscription in inscriptions"
        class="inscription-list__item"
        @click="onItemClick(inscription)"
    >
      <div v-html="inscription.svg" class="inscription-list__item-icon"></div>

      <div class="inscription-list__item-info">
        <div class="inscription-list__item-title">
          {{ inscription.seed.isDynamic ? 'Dynamic Fungi' : 'Stable Fungi' }}
          <NumberText>{{ inscription.seed.seed }}</NumberText>
        </div>

        <a
            :href="`https://basescan.org/address/${inscription.seed.owner}`"
            target="_blank"
            class="inscription-list__item-description"
            @click.stop
        >{{ inscription.seed.owner }}</a>
      </div>
    </div>

    <template v-if="isLoading">
      <div v-for="_ in 4" class="inscription-list__item --loading">
        <UniversalImage src="/images/fungi/logo.png" class="inscription-list__item-icon" />

        <div class="inscription-list__item-info">
          <div class="inscription-list__item-title">Fungi</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useLayoutStore } from '@/stores'

defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },

  inscriptions: {
    type: Array,
    required: true,
  },
})

const layoutStore = useLayoutStore()

function onItemClick(item) {
  layoutStore.openModal('Info', { item })
}
</script>

<style scoped lang="sass">
.inscription-list
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  grid-gap: 24px

  &__item
    position: relative
    display: flex
    flex-direction: column
    cursor: pointer
    width: 100%
    overflow: hidden
    background-color: $mainColor
    border: 1px solid $borderColor
    transition: transform 350ms ease
    animation: fadeIn 350ms ease

    &:hover
      transform: scale(1.02)

    &-icon
      height: auto
      width: 100%
      object-fit: cover
      position: relative

    &-info
      padding: 16px
      display: flex
      flex-direction: column
      gap: 8px

    &-title
      font-weight: 500
      font-size: 20px

    &-description
      color: grey
      word-break: break-all

    &.--loading
      &:after
        content: ''
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        background-color: #dddddd

      &:hover
        transform: none

      .inscription-list__item-icon
        width: 100%
        height: 100%

  @media screen and (max-width: $breakpointTablet)
    grid-template-columns: 1fr 1fr 1fr

  @media screen and (max-width: $breakpointMobile)
    grid-template-columns: 1fr 1fr
    grid-gap: 16px

    &__item
      &-description
        font-size: 14px
</style>