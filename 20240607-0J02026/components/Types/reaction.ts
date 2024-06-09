/*type reaction = {
  id: string
  sectionID: string
  sourceID: string
  text: string
  nickname: string
  sentDate: Date
}*/

type reaction = {
  reactionID: string
  connectionID: string
  roomID: string
  sectionID: string | null
  sourceReactionID: string | null
  nickname: string
  text: string
  sentDate: Date
}
