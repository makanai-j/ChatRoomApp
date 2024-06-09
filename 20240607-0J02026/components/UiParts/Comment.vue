<script setup lang="ts">
import { xssNl2br } from '../Plugins/xssNl2br'
import formatDate from '../Plugins/FormatDate'
const props = defineProps({
  reaction: { type: Object, required: true },
})
const reaction: reaction = props.reaction as reaction
</script>

<template>
  <div class="info-container">
    <div class="top-info">
      <p class="top-item name">{{ reaction.nickname }}</p>
      <p class="top-item time">{{ formatDate(reaction.sentDate) }}</p>
    </div>
    <p class="text" v-html="xssNl2br(reaction.text).replace('\n', '<br>')"></p>
  </div>
</template>

<style scoped>
.info-container {
  padding: 15px;
  text-align: left;
  max-width: 400px;
}
.top-info {
  height: 17px;
  display: flex;
}
.top-item {
  height: 13px;
  padding: 2px 6px;
}
.name {
  font-size: 13px;
}
.time {
  height: 11px;
  padding: 4px 6px 2px;
  font-size: 11px;
}
.text {
  background-color: #8885;
  font-size: 14px;
  padding: 10px;
  margin: 10px;
  margin-left: 15px;
  line-height: 1.8em;
}
</style>
