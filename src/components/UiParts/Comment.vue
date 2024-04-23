<script setup lang="ts">
let oldTime: number = 1713765070000;
let newTime: number = 1713765076528;

let disTime: number = Math.floor((newTime - oldTime) / 1000);
</script>

<template>
  <div class="top-info">
    <img class="top-item icon-img" src="../../assets/vue.svg" />
    <p class="top-item name">user name</p>
    <p class="top-item time">{{ disTime }} s</p>
  </div>
</template>

<style scoped>
.top-item {
  padding: 5px;
}
.top-info {
  display: flex;
}
</style>
