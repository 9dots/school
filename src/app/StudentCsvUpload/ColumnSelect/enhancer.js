import { compose, withState, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import steps from './steps'

export default compose(
  withState('currentStep', 'setStep', 0),
  withHandlers({
    back: ({ setStep, currentStep }) => val => {
      return setStep(Math.max(--currentStep, 0))
    },
    next: ({ setStep, currentStep }) => val => {
      return setStep(Math.min(++currentStep, steps.length - 1))
    }
  }),
  withFormik({
    displayName: 'csvColumns',
    mapPropsToValues: () => ({}),
    handleSubmit: (values, { props: { stepModal, data } }) => {
      const sheet = data.map(row => {
        return format(row, values)
      })

      stepModal.next({
        data: sheet.reduce(function (acc, cur, i) {
          acc[i] = cur
          return acc
        }, {})
      })
    }
  })
)

function format (row, values) {
  return Object.keys(values).reduce((acc, key) => {
    const val =
      key === 'name' ? getNames(values[key], values, row) : row[values[key]]

    return {
      ...acc,
      [key]: val
    }
  }, {})
}

function getNames (obj, values, row) {
  const jointName = values.name.given === values.name.family
  return Object.keys(obj).reduce(
    (acc, nameType) => ({
      ...acc,
      [nameType]: toTitleCase(
        jointName ? splitName(row[obj[nameType]], nameType) : row[obj[nameType]]
      )
    }),
    {}
  )
}

function splitName (name, key) {
  // Reverse order if commmas are in the string
  const last = name.substring(0, name.lastIndexOf(','))
  const first = name.substring(name.lastIndexOf(',') + 1, name.length)
  name = (first + ' ' + last).replace(',', '').trim()

  // Take up to two names for first name rest go to last name
  const parts = name.split(' ')
  const max = Math.min(parts.length - 1, 2)

  return {
    given: parts.slice(0, max).join(' '),
    family: parts.slice(max).join(' ')
  }[key]
}

function toTitleCase (input) {
  return input
    .split(' ')
    .map(i => (i[0] || '').toUpperCase() + (i.substring(1) || '').toLowerCase())
    .join(' ')
}
