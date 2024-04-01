<template>
  <div class="socials">
    <a
        v-for="social in SOCIALS"
        :href="social.url"
        target="_blank"
        class="socials__social"
    >
      <UniversalImage :src="social.icon" class="socials__social-icon" />
    </a>
  </div>
</template>

<script setup>
import { SOCIALS } from '@/const/socials'
</script>

<style scoped lang="sass">
.socials
  display: flex
  flex-wrap: wrap
  gap: 14px

  &__social
    padding: 4px
    border: 1px solid $borderColor
    display: flex
    color: black
    cursor: pointer !important
    background-color: $mainColor
    transition: all 350ms ease

    &:hover
      opacity: 0.6

    &-icon
      height: 26px
      width: 26px
      image-rendering: pixelated

  @media screen and (max-width: $breakpointMobile)
    gap: 8px
    justify-content: flex-end

    &__social
      &-icon
        height: 22px
        width: 22px
</style>