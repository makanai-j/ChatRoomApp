<script setup lang="ts">
import { ref } from 'vue'
import OwnerCheckModal from './Modals/OwnerCheckModal.vue'
import { RoomUtil } from '../Models/RoomUtil'
import UserUtil from '../Models/UserUtil'

const isShownCheckModal = ref(false)

const clientName = ref(UserUtil.nickname.value)
const clientNameField = ref<HTMLInputElement | null>(null)
const reClientName = (e: Event) => {
  if (e.type == 'focusout') {
    if (UserUtil.nickname.value == clientName.value) return
    UserUtil.addUser(clientName.value, RoomUtil.roomID!)
  } else if (e.type == 'keydown' && (e as KeyboardEvent).key == 'Enter') {
    clientNameField.value?.blur()
  }
}
</script>
<template>
  <div class="footer-container">
    <div class="client-name-container">
      <p class="title">名前</p>
      <input type="text" ref="clientNameField" v-model="clientName" @keydown="reClientName" @focusout="reClientName" />
    </div>
    <div class="room-code-container">
      <p class="title">部屋番号</p>
      <p class="room-id">{{ RoomUtil.roomID }}</p>
      <div v-if="RoomUtil.ownerCheckCode.value">
        <p>/</p>
        <p>{{ RoomUtil.ownerCheckCode.value }}</p>
      </div>
      <button v-else class="show-check-owner-modal" @click="() => (isShownCheckModal = !isShownCheckModal)">
        管理者として入室
      </button>
    </div>
    <OwnerCheckModal
      v-if="isShownCheckModal"
      @toggleIsShown="() => (isShownCheckModal = !isShownCheckModal)"
    ></OwnerCheckModal>
  </div>
</template>
<style scoped>
.footer-container {
  display: flex;
  height: var(--footer-height);
  background-color: white;
  color: black;
  font-size: 0.8em;
}
.footer-container div {
  display: flex;
}
p {
  padding: 5px;
}
.title {
  font-weight: 500;
  color: #777;
}
.room-code-container {
  margin-left: auto;
  margin-right: 10px;
}
input {
  background-color: #333;
  margin: 3px 5px;
  padding: 3px 6px;
  color: #eee;
}
.owner-code-text {
  width: 100px;
}
.show-check-owner-modal {
  margin: auto;
  padding: 4px 8px;
  font-size: 0.8em;
  font-weight: 400;
  background-color: #14fb;
  color: #eee;
  border: none;
  outline: none;
  border-radius: 0px;
}
</style>
