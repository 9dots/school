import { errorToMessage } from './errors'
import setProp from '@f/set-prop'

export function isEmail (str) {
  return str && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
}

export const setArrayImmutable = (arr, i, value) =>
  Object.assign([...arr], { [i]: value })

export function stopEvent (action = () => {}) {
  return e => {
    e.stopPropagation()
    e.preventDefault()
    action(e)
  }
}

export function stopProp (action = () => {}) {
  return e => {
    e.stopPropagation()
    action(e)
  }
}

export function filterByLabel (inputVal, { props: { label = '' } }) {
  return label.toLowerCase().indexOf(inputVal.toLowerCase()) > -1
}

export function validate (validator, cast, overWrites) {
  return (values, props) => {
    const { valid, errors } = validator(cast(values, props), { greedy: true })
    console.log(errors)
    if (valid) return
    return getValidationErrors(
      {
        errorDetails: errors
      },
      overWrites
    )
  }
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
