export const randColor = (): string => {
  let color = '#'
  color += Math.floor(Math.random() * 5).toString(16)
  color += Math.floor(Math.random() * 7 + 3).toString(16)
  color += Math.floor(Math.random() * 10 + 4).toString(16)
  return color
}
