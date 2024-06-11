import { reactive } from 'vue'
export class AlertManager {
  private static _text: { value: string[] } = reactive({ value: [] })

  static set text(text: string) {
    AlertManager._text.value.push(text)
    setTimeout(() => {
      AlertManager._text.value.splice(0, 1)
    }, 3000)
  }

  static get text(): string[] {
    return AlertManager._text.value
  }
}
export class ModalManager {
  static isShownErrorText: { value: boolean } = reactive({ value: false })
}
