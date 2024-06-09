<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ChatRoom from './ChatRoom.vue'
import AlertSeal from '../UiParts/AlertSeal.vue'
import SectionArea from '../UiParts/SectionArea.vue'
import Form from './Form.vue'
import { WebSocketController } from '../Models/WebsocketController'
import { RoomUtil } from '../Models/RoomUtil'
import UserUtil from '../Models/UserUtil'

const isLoading = ref(false)
const isAllowedToRoom = ref(false)

const roomController = async (isEnter: boolean, roomID: string) => {
  isLoading.value = true
  console.log('isloading')
  let isAllowed: boolean
  WebSocketController.open(async () => {
    if (isEnter) {
      isAllowed = await RoomUtil.enter(roomID)
    } else {
      isAllowed = await RoomUtil.create('rooom', roomID)
    }
    if (isAllowed) {
      isAllowedToRoom.value = true
      console.log('opened')
      UserUtil.addUser('このルーム' + (isEnter ? 'に入ってきた人' : 'を作った人'), roomID)
    } else {
      WebSocketController.close(() => {
        console.log('closed')
      })
    }
    isLoading.value = false
  })
}

const route = useRoute()
if (typeof route.params.id == 'string') {
  roomController(true, route.params.id)
}
</script>
<template>
  <AlertSeal></AlertSeal>
  <Form v-if="!isAllowedToRoom" :isLoading="isLoading" @roomController="roomController"></Form>
  <div v-else="!isAllowedToRoom" class="chat-section-container">
    <ChatRoom class="chat-room"></ChatRoom>
    <SectionArea class="section-area"></SectionArea>
  </div>
</template>

<style>
:root {
  --section-space-width: 220px;
}
.chat-section-container {
  width: 100%;
  display: flex;
}
.chat-room {
  width: calc(100% - var(--section-space-width));
}
.section-area {
  width: var(--section-space-width);
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
