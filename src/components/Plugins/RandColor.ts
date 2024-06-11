export const randColor = (): string => {
  let color = '#'
  color += Math.floor(Math.random() * 10 + 2).toString(16)
  color += Math.floor(Math.random() * 10 + 2).toString(16)
  color += Math.floor(Math.random() * 10 + 5).toString(16)
  return color
}
