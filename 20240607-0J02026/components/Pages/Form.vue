<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import FormChangeButton from '../UiParts/FormChangeButton.vue'
import HashStr from '../Plugins/Hash11'

const props = defineProps({
  isLoading: { type: Boolean, required: true },
})
const emit = defineEmits<{
  (e: 'roomController', isEnter: boolean, roomID: string): void
}>()

const roomID = ref('')
const isEnter = ref(true)
const isCreate = ref(false)
const toggleIsEnter = (isE: boolean) => {
  isEnter.value = isE
  isCreate.value = !isE
}

watch(isEnter, () => {
  if (isEnter.value) {
    roomID.value = ''
  } else {
    roomID.value = HashStr.hash11()
  }
})

const isAllowedToRoom = computed(() => {
  return (isCreate.value || (isEnter.value && roomID.value.length == 11)) && !props.isLoading
})
</script>

<template>
  <div class="form-container">
    <FormChangeButton class="form-change-button" :isEnter="isEnter" @toggleIsEnter="toggleIsEnter"></FormChangeButton>
    <div>
      <p>ルームの番号</p>
      <div>
        <input
          id="input-room-id"
          name="inputRoomID"
          type="text"
          v-model="roomID"
          :class="{ isEnter: isEnter, isCreate: isCreate, 'form-room-text': true }"
          :readonly="!isEnter"
        />
      </div>
      <p>パスワード</p>
      <input type="text" name="password" :class="['password', 'form-room-text']" placeholder="任意" />
      <p>部屋の名前</p>
      <input type="text" name="password" :class="['password', 'form-room-text']" />
      <div class="outside-to-room-button">
        <button
          @click="emit('roomController', isEnter, roomID)"
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
.password {
  background-color: #eee;
  color: black;
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
  margin: 8px 0;
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
