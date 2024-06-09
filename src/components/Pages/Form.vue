<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import HashStr from '../Plugins/Hash11'
import FormChangeButton from '../UiParts/FormChangeButton.vue'
import { RoomUtil } from '../Models/RoomUtil'

const roomID = ref('')
const roomName = ref('')
const isEnter = ref(true)
const toggleIsEnter = (isE: boolean) => {
  isEnter.value = isE
}

const router = useRouter()
const goRoom = () => {
  RoomUtil.roomName = null
  if (isEnter.value) {
    router.push({
      name: 'ChatRoom',
      params: {
        id: roomID.value,
      },
    })
  } else {
    console.log('create')
    RoomUtil.roomName = roomName.value
    router.push({
      name: 'ChatRoomOwner',
      params: {
        id: roomID.value,
        checkCode: HashStr.randCode(),
      },
    })
  }
}

watch(isEnter, () => {
  if (isEnter.value) {
    roomID.value = ''
  } else {
    roomID.value = HashStr.hash11()
  }
})

const isAllowedToRoom = computed(() => {
  return (!isEnter.value && roomName.value != '') || (isEnter.value && roomID.value.length == 11)
})
</script>

<template>
  <div class="form-container">
    <FormChangeButton class="form-change-button" @toggleIsEnter="toggleIsEnter"></FormChangeButton>
    <div>
      <p>ルームの番号</p>
      <div>
        <input
          id="input-room-id"
          name="inputRoomID"
          type="text"
          v-model="roomID"
          :class="[isEnter ? 'isEnter' : 'isCreate', 'form-room-text']"
          :readonly="!isEnter"
        />
      </div>
      <!--
      <div class="password-outside">
        <p>パスワード</p>
        <input type="text" name="password" :class="['password', 'form-room-text']" placeholder="任意" />
      </div> -->
      <div class="room-name-outside">
        <p :style="{ color: isEnter ? '#666' : '#fff' }">部屋の名前</p>
        <input
          type="text"
          name="password"
          v-model="roomName"
          :class="[!isEnter ? 'isEnter' : 'isCreate', 'room-name', 'form-room-text']"
          :readonly="isEnter"
        />
      </div>
      <div class="outside-to-room-button">
        <button
          @click="goRoom"
          :disabled="!isAllowedToRoom"
          :class="{ isAllowedToRoom: isAllowedToRoom, 'to-room-button': true }"
        >
          部屋へ
        </button>
      </div>
    </div>

    <!--<div><input type="text" class="form-enter-password" /></div>-->
  </div>
</template>

<style scoped>
.form-container {
  margin: auto;
  padding: 50px 20px;
}
.form-change-button {
  margin: 20px auto;
}
.form-container p {
  font-size: 13px;
  text-align: left;
}
.form-room-text {
  margin: 5px auto;
  padding: 3px;
}
.password,
.room-name {
  background-color: #eee;
  color: black;
}
.room-name-outside {
  margin-top: 16px;
}
.isEnter {
  background-color: #eee;
  color: black;
}
.isCreate {
  background-color: #333;
  color: #ccc;
}
.outside-to-room-button {
  width: 100%;
  text-align: center;
  margin: 24px 0;
}
.to-room-button {
  width: calc(100%);
  background-color: #38f3;
  color: #777;
  font-weight: bold;
  border-radius: 0;
  font-size: 14px;
  padding: 3px;
  outline: none;
  border: none;
}
.isAllowedToRoom {
  background-color: #38fd;
  color: #eee;
}
</style>
