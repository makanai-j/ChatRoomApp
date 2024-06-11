<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AutoReseizeTextarea from './AutoResizeTextarea.vue'
import { RoomUtil } from '../Models/RoomUtil'
import { ReaSecUtil } from '../Models/ReaSecUtil'
import { AlertManager } from '../Models/AlertModalManager'
import HashStr from '../Plugins/Hash11'

const emit = defineEmits<{
  (e: 'setCommentHeight', h: number): void
}>()

onMounted(() => {
  emit('setCommentHeight', inputFieldHeight())
  watch(text, () => {
    setTimeout(() => {
      if (textarea.value) {
        emit('setCommentHeight', inputFieldHeight())
      }
    }, 100)
  })
  window.addEventListener('resize', () => {
    emit('setCommentHeight', inputFieldHeight())
  })
})

const inputField = ref<HTMLElement | null>(null)

const textarea = ref<InstanceType<typeof AutoReseizeTextarea> | null>(null)

const text = ref('')
const sendReaction = () => {
  if (ReaSecUtil.selectedSection.value == null) {
    AlertManager.text = 'セクションを選択してください'
  } else if (checkText.value && RoomUtil.roomID) {
    const rID = HashStr.randCode(12)
    ReaSecUtil.sendReaction(text.value, RoomUtil.roomID, ReaSecUtil.selectedSection.value, null, rID)
    textarea.value?.resetText()
    ReaSecUtil.reactionForScroll.value = null
    ReaSecUtil.reactionForScroll.value = rID
  }
}
const checkText = computed((): boolean => {
  let t = text.value.replace(/\r\n/g, '').replace(/(\n|\r)/g, '')
  return t != ''
})
const setText = (t: string) => {
  text.value = t
}
const inputFieldHeight = () => {
  if (inputField.value == null) return 0
  return inputField.value.clientHeight
}
</script>
<template>
  <div class="input-field" ref="inputField">
    <AutoReseizeTextarea class="input-text" ref="textarea" @setText="setText"></AutoReseizeTextarea>
    <button :class="[checkText ? 'send-ok' : 'send-no', 'send-button']" @click="sendReaction">➝</button>
  </div>
</template>

<style scoped>
.input-field {
  width: calc(100% - var(--section-space-width));
  max-height: 200px;
  display: flex;
  position: fixed;
  inset: auto 0 var(--footer-height);
}
.input-text {
  width: calc(100% - 45px);
  padding: 5px;
  background-color: #eee;
  color: #222;
}
.send-button {
  width: 45px;
  margin: 0;
  border-radius: 0;
}
.send-ok {
  background-color: #58f;
  color: #eee;
}
.send-no {
  background-color: #eee;
  color: #555;
}
</style>
