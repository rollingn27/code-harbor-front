<template>
  <router-view />
  <loading-bar v-if="loadingStore.isLoading" />
</template>

<script setup>
import { onUnmounted } from 'vue'
import { useLoadingStore } from './stores/loading.store'
const loadingStore = useLoadingStore()
onUnmounted(() => {
  localStorage.removeItem('code-harbor-auth')
})
</script>
<style scoped></style>
