import { httpRoute } from '../config/AwsComponet'
import { WebSocketController } from './WebsocketController'
import HashStr from '../Plugins/Hash11'
interface _Room {
  create: (nickname: string, roomName: string, password: string | undefined | null) => Promise<boolean>
  enter: (nickname: string, roomID: string, password: string | undefined | null) => Promise<boolean>
  //delete: () => Promise<boolean>
  leave: (func: () => void) => void
  //addSection: () => Promise<boolean>
  //deleteSection: () => Promise<boolean>
}

export class RoomUtil {
  static ownerCheckCode: string | null = null
  static roomName: string | null = null
  static roomID: string | null = null

  static async create(roomName: string, roomID: string, password: string | undefined | null = null): Promise<boolean> {
    RoomUtil.roomID = roomID
    RoomUtil.ownerCheckCode = HashStr.randCode()
    RoomUtil.roomName = roomName
    return await fetch(httpRoute.create(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomID: RoomUtil.roomID,
        roomName: roomName,
        password: password,
        ownerCheckCode: RoomUtil.ownerCheckCode,
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
            ownerCheckCode: RoomUtil.ownerCheckCode,
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

  static async enter(roomID: string, password: string | undefined | null = null): Promise<boolean> {
    return await fetch(httpRoute.enter(roomID), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: password,
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
          RoomUtil.ownerCheckCode = null
          WebSocketController.send({
            action: 'room',
            roomID: roomID,
            ownerCheckCode: RoomUtil.ownerCheckCode,
          })
          return true
        } else {
          return false
        }
      })
  }

  static async reEnter(): Promise<boolean> {
    if (RoomUtil.roomID === null) return false
    return await RoomUtil.enter(RoomUtil.roomID)
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

  //addSection: () => boolean

  //deleteSection: () => boolean
}
