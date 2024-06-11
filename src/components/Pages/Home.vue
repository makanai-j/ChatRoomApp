<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChatRoom from './ChatRoom.vue'
import Loading from './Loading.vue'
import Footer from '../UiParts/Footer.vue'
import SectionArea from '../UiParts/SectionArea.vue'
import { WebSocketController } from '../Models/WebsocketController'
import { RoomUtil } from '../Models/RoomUtil'
import UserUtil from '../Models/UserUtil'
import { AlertManager } from '../Models/AlertModalManager'

const isLoading = ref(false)
const isAllowedToRoom = ref(false)

const router = useRouter()
const route = useRoute()
let isAllowed: boolean = false
WebSocketController.open(async () => {
  let name: string = ''
  let checkCode: string | null = typeof route.params.checkCode == 'string' ? route.params.checkCode : null
  if (checkCode && typeof route.params.id == 'string' && RoomUtil.roomName) {
    isAllowed = await RoomUtil.create(route.params.id, null, checkCode)
    name = 'このルームを作った人'
  } else if (typeof route.params.id == 'string') {
    isAllowed = await RoomUtil.enter(route.params.id, null, checkCode)
    name = 'このルームに入ってきた人'
  }
  if (isAllowed) {
    isAllowedToRoom.value = true
    UserUtil.addUser(name, RoomUtil.roomID!)
  } else {
    WebSocketController.close(() => {
      console.log('closed')
      router.push('/')
      AlertManager.text = '入室に失敗しました。'
    })
  }
  isLoading.value = false
})
</script>
<template>
  <Loading v-if="!isAllowedToRoom"></Loading>
  <div v-else="!isAllowedToRoom" class="chat-section-container-outside">
    <div class="chat-section-container">
      <ChatRoom class="chat-room"></ChatRoom>
      <SectionArea class="section-area"></SectionArea>
    </div>
    <Footer></Footer>
  </div>
</template>

<style>
:root {
  --section-space-width: 220px;
  --footer-height: 30px;
}
.chat-section-container-outside {
  width: 100%;
  height: 100vh;
}
.chat-section-container {
  width: 100%;
  height: calc(100vh - var(--footer-height));
  display: flex;
}
.chat-room {
  width: calc(100% - var(--section-space-width));
}
.section-area {
  width: var(--section-space-width);
  height: 100%;
  overflow: hidden;
  position: relative;
}
.footer {
  width: 100%;
  height: var(--footer-height);
  background-color: aqua;
  margin: 0;
}
</style>
