export function isEmail (str) {
  return str && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
}

export const setArrayImmutable = (arr, i, value) =>
  Object.assign([...arr], { [i]: value })

export function stopEvent (action) {
  return e => {
    e.stopPropagation()
    e.preventDefault()
    action(e)
  }
}
