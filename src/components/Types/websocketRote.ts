type userRote = {
  action: 'user'
  nickname: string
  roomID: string
  lastSignInDate: Date
}
type reactionRote = {
  action: 'reaction'
  reactionID: string
  roomID: string
  sectionID: string | null
  sourceReactionID: string | null
  text: string
  sentDate: Date
}
type roomRote = {
  action: 'room'
  roomID: string
  sectionID?: string
  ownerCheckCode?: string | null
}
type sectionRote = {
  action: 'section'
  sectionID: string
  roomID: string
  sectionName: string
  createdDate: Date
  color: string
}
