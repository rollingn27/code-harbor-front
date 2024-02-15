<template>
  <router-view />
  <loading-bar v-if="loadingStore.isLoading" />
</template>

<script setup>
import { useLoadingStore } from './stores/loading.store'
const loadingStore = useLoadingStore()
</script>
<style scoped></style>
