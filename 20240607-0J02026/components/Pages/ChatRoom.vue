<script setup lang="ts">
import { onMounted, ref, Ref, watch } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import Comment from '../UiParts/Comment.vue'
import ReactionInput from '../UiParts/ReactionInput.vue'
import { ReaSecUtil } from '../Models/ReaSecUtil'
import { RoomUtil } from '../Models/RoomUtil'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

ReaSecUtil.init(RoomUtil.roomID, () => {
  scrollBottom()
})

const scrollBottom = () => {
  if (ReaSecUtil.sections.value.length > 0) {
    gsap.to(commentContainer.value, {
      duration: 0,
      scrollTo: { y: '#' + ReaSecUtil.sortedSections.value[ReaSecUtil.sections.value.length - 1].sectionID },
    })
  }
}

watch(ReaSecUtil.sectionForScroll, () => {
  console.log('scroll target')
  if (ReaSecUtil.sectionForScroll.value) {
    scrollTarget(ReaSecUtil.sectionForScroll.value)
  }
})

const scrollTarget = (id: string) => {
  gsap.to(commentContainer.value, {
    duration: 0.5,
    scrollTo: { y: '#' + id },
  })
}

//watch(ReactionUtil.reactions, scrollBottom)

const commentContainer: Ref<HTMLDivElement | null> = ref(null)
const setCommentHeight = (h: number) => {
  if (commentContainer.value) {
    commentContainer.value.style.height = window.innerHeight - h + 'px'
  }
}
onMounted(() => {})

const reactionSBysectio = (sectionID: string) => {
  return ReaSecUtil.sortedReactions.value.filter((a) => {
    return a.sectionID == sectionID
  })
}
</script>
<template>
  <div>
    <div class="comment-container" ref="commentContainer">
      <div v-for="section in ReaSecUtil.sortedSections.value" :key="section.sectionID" :id="section.sectionID">
        <h2
          class="section-title"
          :id="section.sectionID"
          :style="{ 'background-color': section.color ? section.color : '#0000ff' }"
        >
          {{ section.sectionName }}
        </h2>
        <p v-if="reactionSBysectio(section.sectionID).length == 0" class="not-reaction">リアクションはまだありません</p>
        <article
          v-else
          v-for="reaction in reactionSBysectio(section.sectionID)"
          :key="reaction.reactionID"
          class="comment-outside"
          :id="reaction.reactionID"
        >
          <Comment :reaction="reaction"></Comment>
        </article>
      </div>
    </div>
    <ReactionInput @setCommentHeight="setCommentHeight"></ReactionInput>
  </div>
</template>
<style>
:root {
  --textarea-height: 90px;
}
.comment-container {
  width: 100%;
  max-height: calc(100vh - var(--textarea-height));
  overflow-y: scroll;
  padding: 10px 0px;
}
.section-title {
  width: 90%;
  text-align: center;
  font-size: 0.9em;
  font-weight: bold;
  margin: 6px auto 0px;
  padding: 4px;
  color: #eee;
}
.comment-outside {
  margin: 0px 5%;
}
.not-reaction {
  margin: 20px auto;
  font-size: 0.8em;
}
.reaction-input {
  width: 100%;
  min-height: var(--textarea-height);
}
</style>
