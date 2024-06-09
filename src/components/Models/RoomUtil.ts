import { reactive } from 'vue'
import { httpRoute } from '../config/AwsComponet'
import { WebSocketController } from './WebsocketController'

export class RoomUtil {
  static ownerCheckCode: { value: string | null } = reactive({ value: null })
  static roomName: string | null = null
  static roomID: string | null = null
  private static password: string | null = null

  static async create(
    roomID: string,
    password: string | undefined | null = null,
    ownerCheckCode: string,
  ): Promise<boolean> {
    RoomUtil.roomID = roomID
    RoomUtil.ownerCheckCode.value = ownerCheckCode
    return await fetch(httpRoute.create(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomID: RoomUtil.roomID,
        roomName: RoomUtil.roomName,
        password: password,
        ownerCheckCode: ownerCheckCode,
        createdDate: new Date(),
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.isAllowed) {
          WebSocketController.send({
            action: 'room',
            roomID: RoomUtil.roomID!,
            ownerCheckCode: ownerCheckCode,
          })
          return true
        } else {
          return false
        }
      })
      .catch(() => {
        return false
      })
  }

  static async enter(
    roomID: string,
    password: string | undefined | null = null,
    ownerCheckCode: string | null,
  ): Promise<boolean> {
    return await fetch(httpRoute.enter(roomID), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password,
        ownerCheckCode: ownerCheckCode,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.isAllowed) {
          RoomUtil.roomID = data.roomID
          RoomUtil.roomName = data.roomName
          RoomUtil.ownerCheckCode.value = ownerCheckCode
          WebSocketController.send({
            action: 'room',
            roomID: roomID,
            ownerCheckCode: ownerCheckCode,
          })
          return true
        } else {
          return false
        }
      })
      .catch(() => {
        return false
      })
  }

  static async reEnter(): Promise<boolean> {
    if (RoomUtil.roomID === null) return false
    return await RoomUtil.enter(RoomUtil.roomID, RoomUtil.password, RoomUtil.ownerCheckCode.value)
  }

  //async delete(): Promise<boolean> {return true}

  leave(func: (ev: Event) => void): void {
    WebSocketController.close(func)
    /*
    return await fetch(httpRoute.leave(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      WebSocketController.close()
      return response.status == 200
    })*/
  }

  static async checkOwner(code: string): Promise<boolean> {
    return await fetch(httpRoute.ownerCheck(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomID: RoomUtil.roomID,
        ownerCheckCode: code,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.isOwner) {
          console.log(data)
          return true
        }
        console.log(data)
        return false
      })
  }

  //addSection: () => boolean

  //deleteSection: () => boolean
}
