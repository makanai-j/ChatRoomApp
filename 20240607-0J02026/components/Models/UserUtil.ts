import { RoomUtil } from './RoomUtil'
import { WebSocketController } from './WebsocketController'
import { reactive } from 'vue'

class UserUtil {
  static nickname: { value: string } = reactive({ value: '' })
  static users: { value: string[] } = reactive({ value: [] })

  static addUser(nickname: string, roomID: string): void {
    UserUtil.nickname.value = nickname
    WebSocketController.send({
      action: 'user',
      nickname: UserUtil.nickname.value,
      roomID: roomID,
      lastSignInDate: new Date(),
    })
  }
}

export default UserUtil
