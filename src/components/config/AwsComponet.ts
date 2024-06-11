export class AwsComponent {
  private static httpApiURL = 'https://5x72bvyoqk.execute-api.us-west-2.amazonaws.com'
  private static websocketApiURL = 'wss://74jxj0s66a.execute-api.us-west-2.amazonaws.com/production/'

  static getHttpApiURL = (
    rote: '/room' | '/leave' | '/section' | '/reaction' | '/ownercheck',
    param?: string,
  ): string => {
    return this.httpApiURL + rote + (param ? '' : '/' + param)
  }

  static getWebSocketApiURL = () => {
    return this.websocketApiURL
  }
}

export class httpRoute {
  static readonly create = () => AwsComponent.getHttpApiURL('/room')
  static readonly enter = (param: string) => AwsComponent.getHttpApiURL('/room', param)
  static readonly ownerCheck = () => AwsComponent.getHttpApiURL('/ownercheck')
  //static readonly delete = () => AwsComponent.getHttpApiURL('/room')
  //static readonly leave = () => AwsComponent.getHttpApiURL('/leave')
  static readonly section = () => AwsComponent.getHttpApiURL('/section')
  static readonly reaction = (param: string) => AwsComponent.getHttpApiURL('/reaction', param)
}
