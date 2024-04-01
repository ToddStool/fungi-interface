<template>
  <main>
    <AppHeader />
    <AppPage />
  </main>

  <AppModal />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppPage from '@/components/AppPage.vue'
import AppModal from '@/components/AppModal.vue'
import { onMounted } from 'vue'
import { checkForConnection } from '@/services/user'

onMounted(checkForConnection)
</script>

<style scoped lang="sass">
main
  position: relative
  min-height: 100vh
  height: 100%
</style>