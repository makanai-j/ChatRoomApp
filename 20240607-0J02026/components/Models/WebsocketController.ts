import { AwsComponent } from '../config/AwsComponet'
import { RoomUtil } from './RoomUtil'

export class WebSocketController {
  private static socket: WebSocket | null = null

  static open(onopenFunc: (ev: Event) => void): void {
    WebSocketController.socket = new WebSocket(AwsComponent.getWebSocketApiURL())
    WebSocketController.socket.onopen = onopenFunc
    WebSocketController.socket.onmessage = (ev) => {
      console.log(ev)
    }
  }

  static setOnmessage(func: (message: MessageEvent<any>) => void): void {
    if (WebSocketController.socket) {
      WebSocketController.socket.onmessage = func
      WebSocketController.socket.onerror = (ev) => {
        console.log(ev)
      }
    }
  }

  static close(func: (ev: Event) => void): void {
    if (WebSocketController.socket) {
      WebSocketController.socket.onclose = func
      WebSocketController.socket.close()
    }
  }

  static send(json: userRote | reactionRote | roomRote | sectionRote): void {
    if (WebSocketController.isOpen()) {
      WebSocketController.socket!.send(JSON.stringify(json))
    } else if (WebSocketController.socket) {
      WebSocketController.open(async () => {
        if (!(await RoomUtil.reEnter())) return
        WebSocketController.socket!.send(JSON.stringify(json))
      })
    }
  }

  private static isOpen() {
    if (WebSocketController.socket) {
      return WebSocketController.socket.readyState === WebSocketController.socket.OPEN
    } else {
      return false
    }
  }
}
