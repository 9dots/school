import { errorToMessage } from './errors'
import avatars from 'assets/avatars'
import setProp from '@f/set-prop'
import { map } from '../../node_modules/@firebase/util'

export function isEmail (str) {
  return str && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
}

export const getAvatarByValue = password =>
  (avatars.find(a => a.value === password) || {}).src

export const setArrayImmutable = (arr, i, value) =>
  Object.assign([...arr], { [i]: value })

export function stopEvent (action = () => {}) {
  return e => {
    e.stopPropagation()
    e.preventDefault()
    action(e)
  }
}

export const getTaskTitle = ({ displayName, type }) =>
  displayName || type.charAt(0).toUpperCase() + type.slice(1)

export function stopProp (action = () => {}) {
  return e => {
    e.stopPropagation()
    action(e)
  }
}

export function validate (validator, cast, overWrites) {
  return (values, props, next) => {
    // console.log(values)
    const { valid, errors } = validator(cast(values, props), { greedy: true })
    if (valid) return

    return getValidationErrors(
      {
        errorDetails: errors
      },
      overWrites
    )
  }
}

export function ensureHttp (url) {
  if (!url) return ''
  return url.match(/^[a-zA-Z]+:\/\//) ? url : 'http://' + url
}

export function trimValues (values, omitted) {
  const omitFields = Array.isArray(omitted) ? omitted : [omitted]
  if (omitFields.some(omit => typeof omit !== 'string')) {
    throw new Error('omitted must be string or array of strings')
  }
  return map(
    val =>
      typeof val === 'string' && omitFields.indexOf(val) === -1 && !omitted.inde
        ? val.trim()
        : val,
    values
  )
}

export function getFormDefaults (validator, cast, overWrites) {
  return {
    validateOnChange: true,
    validateOnBlur: false,
    validate: validate(validator, cast, overWrites)
  }
}

/**
 * @function getValidationError
 * @param {object} e The error object to transform
 * @returns object with {errorField: message}
 */
export function getValidationErrors (e, overWrites = {}) {
  return (e.errorDetails || []).reduce(
    (acc, { field, message }) =>
      setProp(field, acc, errorToMessage(message, overWrites[field])),
    {}
  )
}
