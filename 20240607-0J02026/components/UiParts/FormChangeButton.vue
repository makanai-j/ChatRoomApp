<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

let moveDistance: string

onMounted(() => {
  const width = document.getElementsByClassName('change-button')[0].clientWidth
  Array.from(document.getElementsByClassName('square') as HTMLCollectionOf<HTMLElement>)[0].style.width = width + 'px'
  moveDistance = width + 4 + 'px'
})
const emit = defineEmits<{
  (e: 'toggleIsEnter', isE: boolean): void
}>()
const move = (isEnter: boolean) => {
  let x: string
  if (isEnter) {
    x = '0px'
  } else {
    x = moveDistance
  }
  gsap.to('.square', {
    x: x,
    duration: 0.3,
  })
  emit('toggleIsEnter', isEnter)
}
</script>

<template>
  <div class="form-change-button">
    <div class="square"></div>
    <button @click="move(true)" class="change-button">入る</button>
    <button @click="move(false)" class="change-button">作る</button>
  </div>
</template>

<style scoped>
.form-change-button {
  --change-button-height: 26px;
  width: 100%;
  border: solid 1px;
}
.change-button {
  width: calc(50% - 6px);
  height: var(--change-button-height);
  font-size: 14px;
  margin: 3px;
  outline: none;
  border: none;
}
.square {
  height: var(--change-button-height);
  margin: 3px;
  background-color: #05f;
  position: absolute;
  z-index: -1;
}
</style>
