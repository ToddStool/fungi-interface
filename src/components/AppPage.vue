<template>
  <div class="page">
    <div class="page__header">
      <TextWrapper :max-symbols="102" class="page__description">
        Fungi, $FUNGI. The First ERC-20i with Native Inscriptions./n/n
        $FUNGI is a unique, fully on-chain art project offering an innovative new ERC-20i format with inscription metadata. Each portion of tokens resembles a seed that generates unique 24x24 dynamic images of Fungi stored on-chain, depending on the wallet's token balance./n/n
        To achieve a visual rendering of the project, we built a front end and uploaded it to the decentralized IPFS storage, making the project immutable. All project files, including the arts, smart contracts, and the frontend app's source codes, were uploaded to the project's GitHub page for other developers who want to utilize the new ERC-20i inscriptions format.
      </TextWrapper>

      <SocialsBlock class="page__socials" />
    </div>


    <div class="page__title">
      <div class="page__title-heading">Seed Inscriptions</div>

      <SelectTabs
          v-model="currentOption"
          :options="options"
          class="page__title-select"
      />
    </div>


    <div v-if="userStore.isConnected" class="page__body">
      <InputField
          v-if="currentOption.id === 'address'"
          v-model="searchText"
          placeholder="Search by address"
          class="page__search"
      />

      <InscriptionList
          v-if="isLoading || inscriptions.length"
          :inscriptions="inscriptions"
          :is-loading="isLoading"
          :key="currentOption.id + inscriptions.length"
          class="page__list"
      />

      <div v-else-if="!isLoading" class="page__empty">Results not found.</div>

      <BaseButton
          v-if="inscriptions.length && currentOption.id === 'all'"
          class="page__button"
          :class="{ '--disabled': loadMoreTimer > 0 }"
          @click="onLoadMoreClick"
      >{{ loadMoreTimer ? `(${loadMoreTimer})` : '' }} Load more</BaseButton>
    </div>


    <div v-else class="page__body">
      <div class="page__empty">Connect your wallet to view the results.</div>
      <BaseButton icon="/images/wallet.png" class="page__button" @click="connect">Connect Wallet</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import InscriptionList from '@/components/InscriptionList.vue'
import TextWrapper from '@/components/TextWrapper.vue'
import SelectTabs from '@/components/SelectTabs.vue'
import InputField from '@/components/InputField.vue'
import SocialsBlock from '@/components/SocialsBlock.vue'
import fungi from '@/services/token'
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { connect } from '@/services/user'

const HOLDER_AMOUNT_PER_PAGE = 3
const LOAD_MORE_TIMEOUT = 15

const userStore = useUserStore()

const options = ref([
  { id: 'all', title: 'All' },
  { id: 'address', title: 'By address' },
])

const inscriptions = ref([])
const isLoading = ref(false)
const holdersIndex = ref(0)
const loadMoreTimer = ref(0)
const searchText = ref(null)
const currentOption = ref(options.value[0])

watch(() => searchText.value, initInscriptions)
watch(() => userStore.isConnected, init)
watch(() => currentOption.value, () => {
  searchText.value = null
  holdersIndex.value = 0
  initInscriptions()
})

onMounted(init)

function init() {
  if (userStore.isConnected) {
    options.value.splice(
        1,
        0,
        { id: 'my', title: 'My' },
    )
  }

  initInscriptions()
}

async function initInscriptions(withAdding = false) {
  if (!userStore.isConnected) {
    return
  }

  let seeds = []
  isLoading.value = true

  if (['my', 'address'].includes(currentOption.value.id)) {
    const address = currentOption.value.id === 'my'
        ? userStore.address
        : searchText.value

    seeds = await fungi.fetchSeedsByAddress(address)
  }

  else if (currentOption.value.id === 'all') {
    seeds = await fungi.getHoldersSeeds(holdersIndex.value, HOLDER_AMOUNT_PER_PAGE)
  }

  let newInscriptions = await fungi.fetchInscriptionsBySeeds(seeds)

  if (['my', 'address'].includes(currentOption.value.id)) {
    newInscriptions = newInscriptions.map((i, index) => ({ ...i, isDynamic: index === 0 }))
  }

  if (withAdding) {
    newInscriptions = inscriptions.value.concat(newInscriptions)
  }

  inscriptions.value = newInscriptions
  isLoading.value = false
}

function onLoadMoreClick() {
  holdersIndex.value += HOLDER_AMOUNT_PER_PAGE
  initInscriptions(true)
  startLoadMoreTimer()
}

function startLoadMoreTimer() {
  loadMoreTimer.value = LOAD_MORE_TIMEOUT

  const interval = setInterval(() => {
    loadMoreTimer.value -= 1

    if (loadMoreTimer.value === 0) {
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style scoped lang="sass">
.page
  padding: 48px 64px

  &__title
    margin-bottom: 24px
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 24px

    &-heading
      font-size: 32px
      font-weight: 600

  &__header
    display: flex
    justify-content: space-between
    gap: 24px
    align-items: flex-start
    margin-bottom: 32px

  &__description
    max-width: 50%
    font-size: 17px

    span
      font-weight: 600
      cursor: pointer

  &__search
    margin-bottom: 20px
    max-width: 420px
    animation: fadeIn 350ms ease

  &__button
    margin-top: 16px

    &.--disabled
      pointer-events: none
      opacity: 0.7

  @media screen and (max-width: $breakpointMobile)
    padding: 36px 24px

    &__description
      max-width: 100%

    &__title
      font-size: 28px

      &-select
        width: 100%

    &__search
      max-width: 100%

    &__button
      width: 100%

    &__empty
      text-align: center
      margin-top: 54px
</style>