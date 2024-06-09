<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { computed, onMounted, ref } from 'vue'
import { ReaSecUtil } from '../Models/ReaSecUtil'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const isShowingButton = ref(true)
const scroll = (duration: number) => {
  const sectionAreaHeight = 102
  gsap.to('.add-section-outside', {
    duration: duration,
    y: isShowingButton.value ? sectionAreaHeight : 0,
  })
  isShowingButton.value = !isShowingButton.value
}
onMounted(() => scroll(0))

const sectionName = ref('')
const isAllowedAdd = computed(() => {
  return sectionName.value.length > 0
})
const sendSection = () => {
  ReaSecUtil.sendSection(sectionName.value)
  sectionName.value = ''
}
</script>

<template>
  <div class="add-section-outside">
    <button class="show-add-button" @click="scroll(0.3)">セクションを追加する</button>
    <div class="section-form">
      <div><input type="text" class="input-section-name" placeholder="名前" v-model="sectionName" /></div>
      <button
        @click="sendSection()"
        :class="[isAllowedAdd ? 'is-allowed-add' : 'is-not-allowed-add']"
        :disabled="!isAllowedAdd"
      >
        追加
      </button>
    </div>
  </div>
</template>

<style scoped>
.add-section-outside {
  width: var(--section-space-width);
  height: 135px;
  position: absolute;
  color: #eee;
  background-color: white;
  top: auto;
  right: 0;
  bottom: 0;
  left: auto;
  margin: auto;
}
.show-add-button {
  margin: auto;
  background-color: #222;
  padding: 5px;
  width: 100%;
  height: var(--show-add-button-height);
  font-size: 0.8em;
  border-radius: 0px;
  color: white;
  border: none;
  outline: none;
}
.section-form {
  width: 80%;
  margin: auto;
  font-size: 0.85em;
  color: #222;
}
.section-form p {
  width: 100%;
  padding: 5px 0px;
  text-align: left;
}
.section-form input {
  width: 100%;
  background-color: #eee;
  color: black;
  margin: 13px auto 3px;
  padding: 4px;
  outline: none;
  border: none;
}
.section-form button {
  width: 100%;
  font-weight: bold;
  margin: 10px 0px;
  padding: 3px;
  border-radius: 0px;
}
.is-not-allowed-add {
  background-color: #aaa;
  color: #eee;
}
.is-allowed-add {
  background-color: #48f;
  color: #eee;
}
</style>
