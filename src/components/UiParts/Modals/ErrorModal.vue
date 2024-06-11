<script setup lang="ts">
import { ref, watch } from 'vue'
import { ModalManager } from '../../Models/AlertModalManager'

const reload = () => window.location.reload()

const time = ref(10)
watch(ModalManager.isShownErrorText, () => {
  if (!ModalManager.isShownErrorText.value) return
  setInterval(() => {
    if (time.value > 0) time.value -= 1
    else reload()
  }, 1000)
})
</script>
<template>
  <div v-if="ModalManager.isShownErrorText.value" class="error-modal-outside">
    <div class="background-blur"></div>
    <div class="error-modal-container">
      <h2>エラーが発生しました</h2>
      <button @click="reload">
        再接続する<span>{{ time }}</span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.error-modal-outside {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 77;
}
.background-blur {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(6px);
}
.error-modal-container {
  position: fixed;
  inset: 0;
  width: 220px;
  height: 120px;
  margin: auto;
  padding: 8px;
  background-color: #eee;
  z-index: 88;
}
.error-modal-container h2 {
  padding: 10px;
  color: #e42;
  font-weight: bold;
}
.error-modal-container button {
  width: 80%;
  margin: 8px 0px;
  padding: 3px;
  font-weight: 400;
  background-color: #f33;
  color: #eee;
}
.error-modal-container button span {
  margin-left: 15px;
}
</style>
