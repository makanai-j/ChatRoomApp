<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RoomUtil } from '../Models/RoomUtil'
import { ReaSecUtil } from '../Models/ReaSecUtil'
import AddSection from './AddSection.vue'
import { watch } from 'vue'

const sectionTitles = ref<HTMLDivElement | null>(null)
onMounted(() => {
  if (sectionTitles.value == null) return
  sectionTitles.value.style.setProperty(
    '--room-name-height',
    document.getElementsByClassName('room-name')[0].clientHeight + 'px',
  )
  document.documentElement.style.setProperty('--show-add-button-height', RoomUtil.ownerCheckCode.value ? '33px' : '0px')
})

watch(RoomUtil.ownerCheckCode, () => {
  document.documentElement.style.setProperty('--show-add-button-height', RoomUtil.ownerCheckCode.value ? '33px' : '0px')
})

const selectSection = (secID: string) => {
  ReaSecUtil.selectedSection.value = secID == ReaSecUtil.selectedSection.value ? null : secID
}
const setSection = (secID: string) => {
  ReaSecUtil.sectionForScroll.value = null
  ReaSecUtil.sectionForScroll.value = secID
}
watch(RoomUtil.ownerCheckCode, () => {})
</script>
<template>
  <div class="section-container">
    <h2 class="room-name">{{ RoomUtil.roomName }}</h2>
    <div class="section-titles" ref="sectionTitles">
      <div v-for="section in ReaSecUtil.sections.value" :key="section.sectionID" class="section-row">
        <button
          @click="selectSection(section.sectionID)"
          :class="{
            'select-section': true,
            'selected-section': section.sectionID == ReaSecUtil.selectedSection.value,
          }"
        ></button>
        <button
          @click="setSection(section.sectionID)"
          class="section"
          :style="{ 'background-color': section.color ? section.color : '#0000ff' }"
        >
          {{ section.sectionName }}
        </button>
      </div>
    </div>
    <AddSection v-if="RoomUtil.ownerCheckCode.value"></AddSection>
  </div>
</template>
<style scoped>
.section-container {
  background-color: #eee;
  color: black;
  border: solid 2px #5555;
}
.section-titles {
  --room-name-height: 27px;
  height: calc(100% - var(--room-name-height) - var(--show-add-button-height));
  overflow-y: scroll;
}
.section-container h2 {
  width: 100%;
  font-size: 0.8em;
  font-weight: 500;
  padding: 4px;
}
.section-row {
  width: 100%;
  margin: auto;
  display: flex;
  text-align: center;
}
.select-section {
  width: 15px;
  height: 15px;
  margin: auto 10px;
  border: solid 1.5px #999;
  border-radius: 0px;
  outline: none;
}
.section {
  width: 90%;
  font-size: 0.6em;
  font-weight: bold;
  margin: 6px auto;
  padding: 4px;
  color: white;
  border-radius: 0px;
  border: none;
  outline: none;
}
.selected-section {
  background-color: #04f7;
}
</style>
