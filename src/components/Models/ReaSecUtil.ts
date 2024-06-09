import { ComputedRef, computed, toValue } from 'vue'
import { WebSocketController } from './WebsocketController'
import { httpRoute } from '../config/AwsComponet'
import HashStr from '../Plugins/Hash11'
import { Validate } from '../Plugins/Validate'
import { reactive } from 'vue'
import UserUtil from './UserUtil'
import { RoomUtil } from './RoomUtil'
import { randColor } from '../Plugins/RandColor'
/// import * as uuid from 'uuid'
/// なんでimportできんのんや！！　タコ！！
export class ReaSecUtil {
  static reactions: { value: reaction[] } = reactive({ value: [] })
  static sections: { value: section[] } = reactive({ value: [] })
  static selectedSection: { value: string | null } = reactive({ value: null })
  static sectionForScroll: { value: string | null } = reactive({ value: null })
  static reactionForScroll: { value: string | null } = reactive({ value: null })

  static init(roomID: string | null, oncomplete?: () => void) {
    WebSocketController.setOnmessage((message) => {
      let json = JSON.parse(message.data)
      if (Validate.validateReaction(json)) {
        ReaSecUtil.reactions.value.push(json)
      } else if (Validate.validateSection(json)) {
        ReaSecUtil.sections.value.push(json)
      }
    })
    if (roomID === null) return
    ReaSecUtil.setReactoinsSections(roomID).then(() => {
      if (oncomplete) oncomplete()
    })
  }

  private static async setReactoinsSections(roomID: string) {
    await fetch(httpRoute.reaction(roomID), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.reactions.length > 0 && Validate.validateReaction(data.reactions[0])) {
          ReaSecUtil.reactions.value = data.reactions
        }
        if (data.sections.length > 0 && Validate.validateSection(data.sections[0])) {
          console.log(data.sections)
          ReaSecUtil.sections.value = data.sections
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  static sortedReactions: ComputedRef<reaction[]> = computed(() => {
    if (ReaSecUtil.reactions.value.length > 0)
      return ReaSecUtil.reactions.value.sort((a, b) => (a.sentDate < b.sentDate ? -1 : 1))
    else return []
  })

  static sortedSections: ComputedRef<section[]> = computed(() => {
    if (ReaSecUtil.sections.value.length > 0)
      return ReaSecUtil.sections.value.sort((a, b) => (a.createdDate < b.createdDate ? -1 : 1))
    else return []
  })

  static sendReaction(
    text: string,
    roomID: string,
    sectionID: string | null,
    sourceReactionID: string | null = null,
    reactionID: string = HashStr.randCode(16),
  ): void {
    console.log('send reaction')
    const rRote: reactionRote = {
      action: 'reaction',
      reactionID: reactionID,
      roomID: roomID,
      sectionID: sectionID,
      sourceReactionID: sourceReactionID,
      text: text,
      sentDate: new Date(),
    }
    WebSocketController.send(rRote)

    const r: reaction = {
      reactionID: rRote.reactionID,
      connectionID: '',
      roomID: rRote.roomID,
      sectionID: rRote.sectionID,
      sourceReactionID: rRote.sourceReactionID,
      nickname: UserUtil.nickname.value,
      text: rRote.text,
      sentDate: rRote.sentDate,
    }
    ReaSecUtil.reactions.value.push(r)
  }
  static sendSection(sectionName: string) {
    const sRote: sectionRote = {
      action: 'section',
      sectionID: HashStr.randCode(6),
      roomID: RoomUtil.roomID!,
      sectionName: sectionName,
      createdDate: new Date(),
      color: randColor(),
    }
    WebSocketController.send(sRote)
    const s: section = {
      sectionID: sRote.sectionID,
      roomID: sRote.roomID,
      sectionName: sectionName,
      createdDate: sRote.createdDate,
      color: sRote.color,
    }
    ReaSecUtil.sections.value.push(s)
  }
}
