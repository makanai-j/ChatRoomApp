<script setup lang="ts">
import AlertSeal from './components/UiParts/AlertSeal.vue'
import ErrorModal from './components/UiParts/Modals/ErrorModal.vue'
//import Home from './components/Pages/Home.vue'
//import GateWayTest from './components/Pages/GateWayTest.vue'
</script>
<template>
  <AlertSeal></AlertSeal>
  <ErrorModal></ErrorModal>
  <router-view />
</template>

<style></style>
