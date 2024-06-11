<script setup lang="ts">
import { ref } from 'vue'
import { RoomUtil } from '../../Models/RoomUtil'
import { useRouter } from 'vue-router'
import { AlertManager } from '../../Models/AlertModalManager'

const emit = defineEmits<{
  (e: 'toggleIsShown'): void
}>()

const isLoading = ref(false)

const router = useRouter()

const ownerCheckCode = ref('')
const ownerCheckCodeField = ref<HTMLInputElement | null>(null)

const checkOwner = async () => {
  ownerCheckCodeField.value?.blur()
  isLoading.value = true
  if (await RoomUtil.checkOwner(ownerCheckCode.value)) {
    AlertManager.text = '成功しました'
    router.push({
      name: 'ChatRoomOwner',
      params: {
        id: RoomUtil.roomID,
        checkCode: ownerCheckCode.value,
      },
    })
    RoomUtil.ownerCheckCode.value = ownerCheckCode.value
    emit('toggleIsShown')
    isLoading.value = false
  } else {
    AlertManager.text = '失敗しました'
    isLoading.value = false
  }
}
</script>
<template>
  <div class="background-blur"></div>
  <div class="check-modal-container">
    <h2>管理者として入室</h2>
    <div>
      <input
        type="text"
        ref="ownerCheckCodeField"
        name="owner-code-text"
        class="owner-code-text"
        v-model="ownerCheckCode"
        @keydown.enter="checkOwner"
        placeholder="コード"
      />
    </div>
    <button
      :class="['complete', isLoading ? 'is-loading' : 'is-not-loading']"
      @click="checkOwner"
      :disabled="isLoading"
    >
      {{ isLoading ? '確認しています' : '確認' }}
    </button>
    <button class="cancel" @click="$emit('toggleIsShown')" :disabled="isLoading">キャンセル</button>
  </div>
</template>
<style scoped>
.background-blur {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(6px);
}
.check-modal-container {
  position: fixed;
  inset: 0;
  width: 220px;
  height: 150px;
  margin: auto;
  padding: 8px;
  background-color: #eee;
  z-index: 88;
}
.check-modal-container h2 {
  padding: 10px;
  color: #222;
  font-weight: bold;
}
.check-modal-container input {
  width: 80%;
  padding: 4px 7px;
  background-color: #222;
  color: #eee;
}
.check-modal-container .complete {
  width: 80%;
  margin: 8px 0px;
  padding: 3px;
  font-weight: 500;
}
.is-loading {
  background-color: #ccc;
  color: #999;
}
.is-not-loading {
  background-color: #14be;
  color: #eee;
}
.check-modal-container .cancel {
  padding: 4px 3px;
  color: #444;
}
</style>
