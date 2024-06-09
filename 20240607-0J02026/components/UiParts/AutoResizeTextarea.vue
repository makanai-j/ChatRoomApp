<script setup lang="ts">
import { ref, watch, Ref } from 'vue'

const emit = defineEmits<{
  (e: 'setText', h: string): void
}>()
const textarea: Ref<HTMLElement | null> = ref(null)

const text = ref('')
watch(text, () => {
  emit('setText', text.value)
})
const resetText = (): void => {
  text.value = ''
}
defineExpose({
  resetText,
})
</script>
<template>
  <div class="FlexTextarea">
    <div class="FlexTextarea__dummy" aria-hidden="true" ref="textarea">{{ text }}</div>
    <textarea id="FlexTextarea" class="FlexTextarea__textarea" v-model="text"></textarea>
  </div>
</template>
<style scoped>
.FlexTextarea {
  position: relative;
  font-size: 1rem;
  line-height: 1.8;
}

.FlexTextarea__dummy {
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  padding: 5px 10px;
  min-height: var(--textarea-height);
  max-height: 200px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  border: 1px solid;
}

.FlexTextarea__textarea {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  border-radius: 0px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  resize: none;
}
</style>
