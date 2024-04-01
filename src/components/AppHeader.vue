<template>
  <header class="header">
    <div class="header__overlay"></div>

    <div class="header__content">
      <div class="header__info">
        <UniversalImage src="./images/fungi/logo.png" class="header__info-image" />
        <div class="header__info-title">Fungi</div>
        <div class="header__info-description">CA: {{ CONTRACTS.token.address }}</div>
      </div>

      <div class="header__data">
        <div v-if="Number(inscriptionSupply)" class="header__block">
          <NumberText class="header__block-value">{{ inscriptionSupply }}</NumberText>
          <div class="header__block-title">Inscriptions</div>
        </div>

        <div v-if="Number(holderAmount)" class="header__block">
          <NumberText class="header__block-value">{{ holderAmount }}</NumberText>
          <div class="header__block-title">Holders</div>
        </div>
      </div>
    </div>

    <div class="header__connection">
      <template v-if="userStore.address">
        <BaseButton
            icon="/images/wallet.png"
            class="header__connection-button"
            @click="connect"
        >
          {{ shortAddress(userStore.address, 4) }}
        </BaseButton>

        <div class="header__connection-point">Your $FUNGI: <NumberText>{{ tokenBalance }}</NumberText></div>
        <div class="header__connection-point">Your Inscriptions: <NumberText>{{ inscriptionBalance }}</NumberText></div>
      </template>

      <BaseButton
          v-else
          icon="/images/wallet.png"
          class="header__connection-button"
          @click="connect"
      >Connect</BaseButton>
    </div>
  </header>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import fungi from '@/services/token'
import { connect } from '@/services/user'
import { useUserStore } from '@/stores'
import { shortAddress } from '@/utils/address'
import { onMounted, ref, watch } from 'vue'
import { decimalsOff } from '@/utils/web3'
import { CONTRACTS } from '@/const/contracts'

const userStore = useUserStore()
const tokenSupply = ref(null)
const inscriptionSupply = ref(null)
const tokenBalance = ref(null)
const inscriptionBalance = ref(null)
const holderAmount = ref(null)

watch(() => userStore.address, init)
onMounted(init)

async function init() {
  if (!userStore.address) {
    return
  }

  const [
      totalTokenSupply,
      totalInscriptionSupply,
      decimals,
      balance,
      inscriptions,
      holders,
  ] = await Promise.all([
    fungi.getSupply(),
    fungi.getInscriptionSupply(),
    fungi.getDecimals(),
    fungi.getBalance(userStore.address),
    fungi.getInscriptionsByAddress(userStore.address),
    fungi.getHoldersAmount(),
  ])

  tokenSupply.value = decimalsOff(totalTokenSupply, decimals)
  tokenBalance.value = decimalsOff(balance, decimals)
  inscriptionBalance.value = inscriptions.length
  inscriptionSupply.value = totalInscriptionSupply
  holderAmount.value = holders
}
</script>

<style scoped lang="sass">
.header
  position: relative
  min-height: 364px
  background-image: url('/images/fungi/background-1.png')
  background-position: center
  background-size: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end

  &__overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.75)
    z-index: 0

  &__connection
    z-index: 1
    position: absolute
    display: flex
    flex-direction: column
    align-items: flex-end
    gap: 2px
    top: 32px
    right: 64px
    color: $mainColor
    text-align: right

    &-button
      margin-bottom: 12px
      width: fit-content

  &__content
    position: relative
    padding: 32px 64px
    z-index: 1
    height: 100%
    display: flex
    justify-content: space-between
    align-items: flex-end

  &__info
    display: flex
    flex-direction: column
    gap: 20px
    color: $mainColor

    &-title
      font-size: 36px
      font-weight: 600

    &-image
      height: 96px
      width: 96px
      border-radius: 0px
      border: 1px solid $borderColor

    &-icon
      height: 24px
      width: 24px
      display: inline-block
      //vertical-align: bottom
      cursor: pointer

    &-description
      font-size: 15px
      word-break: break-all

  &__data
    display: flex
    flex-wrap: wrap
    gap: 36px
    row-gap: 16px

  &__block
    display: flex
    flex-direction: column
    color: $mainColor
    font-size: 20px

    &-title
      color: darkgray
      font-size: 18px

    &-value
      font-size: 24px
      font-weight: 500
      max-width: 180px
      word-break: break-all

  @media screen and (max-width: $breakpointMobile)
    background-size: 120%
    background-image: url('/images/fungi/background-2.png')
    min-height: unset

    &__content
      padding: 20px
      flex-direction: column
      align-items: flex-start
      gap: 24px

    &__info
      &-description
        font-size: 14px

    &__connection
      right: 20px
      top: 20px

      &-button
        font-size: 16px

    &__block
      font-size: 16px

      &-value
        font-size: 18px
</style>