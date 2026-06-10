export const ISO = (date: Date, isShort: boolean = false) => {
  const string = date.toISOString()
  return isShort ? string.slice(0, 10) : string
}
