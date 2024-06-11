<script setup lang="ts">
import { AlertManager } from '../Models/AlertModalManager'
</script>
<template>
  <div>
    <p v-for="a in AlertManager.text" class="alert-text">{{ a }}</p>
  </div>
</template>
<style scoped>
.alert-text {
  width: 200px;
  height: 40px;
  font-size: 13px;
  text-align: center;
  padding: 10px;
  margin: 5px auto;
  inset: 0;
  position: fixed;
  color: #22f;
  background-color: white;
  border: solid 1px blue;
  border-radius: 5px;
  z-index: 99;
}
</style>
