import xss from 'xss'

export const xssNl2br = (str: string) => {
  return nl2br(xss(str))
}

const nl2br = (str: string): string => {
  str = str.replace(/\r\n/g, '<br />')
  str = str.replace(/(\n|\r)/g, '<br />')
  return str
}
