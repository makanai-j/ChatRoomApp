<script setup lang="ts">
import { xssNl2br } from '../Plugins/xssNl2br'
import formatDate from '../Plugins/FormatDate'
import { ref } from 'vue'
const props = defineProps({
  reaction: { type: Object, required: true },
})
const reaction: reaction = props.reaction as reaction

const replyField = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <div class="info-container">
    <div class="top-info">
      <p class="top-item name">{{ reaction.nickname }}</p>
      <div>
        <p class="top-item time">{{ formatDate(reaction.sentDate) }}</p>
        <p class="reaction-id">{{ reaction.reactionID }}</p>
      </div>
    </div>
    <div class="comment-text-flex">
      <p class="text" v-html="xssNl2br(reaction.text).replace('\n', '<br>')"></p>
      <button v-if="false" class="reply" ref="replyField"></button>
    </div>
  </div>
</template>

<style scoped>
.info-container {
  --reply-button-width: 25px;
  padding: 8px;
  text-align: left;
  max-width: 500px;
}
.top-info {
  display: flex;
}
.top-item {
  padding: 2px 6px;
}
.name {
  font-size: 0.7em;
}
.top-info div {
  display: flex;
  padding: 2px;
  margin-left: auto;
  margin-right: 0px;
}
.time {
  width: 100%;
  padding: 0px;
  margin-right: 7px;
  font-size: 0.6em;
}
.reaction-id {
  font-size: 0.6em;
  font-weight: 300;
  text-align: right;
}
.comment-text-flex {
  display: flex;
}
.text {
  width: 100%;
  background-color: #8885;
  padding: 6px;
  font-size: 0.8em;
  line-height: 1.4;
}
.reply {
  width: var(--reply-button-width);
  background-color: #666;
  border: none;
  outline: none;
}
.reply:hover {
  background-color: #36fd;
}
</style>
