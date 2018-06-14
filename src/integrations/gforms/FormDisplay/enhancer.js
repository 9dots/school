import { compose, withHandlers } from 'recompose'
import { withFormik } from 'formik'
import setProp from '@f/set-prop'
import map from '@f/map'
import data from './test'

const fields = data.fields
const widgets = fields
  .reduce((acc, f) => acc.concat(f.widgets), [])
  .filter(w => !!w)

export default compose(
  withFormik({
    displayName: 'displayForm',
    handleSubmit: (values, handbag) => console.log(cast(values, handbag.props)),
    validate: (values, props) => {
      const errors = widgets.reduce((acc, w) => {
        if (w.required && !values[w.id]) {
          return setProp(w.id, acc, 'Required')
        }
        return acc
      }, {})
      return { ...errors, ...checkEmail(data, values) }
    },
    mapPropsToValues: props => initValues(data)
  }),
  withHandlers({
    onSubmit: props => e => {
      console.log(cast)
    }
  })
)

function initValues (data) {
  const fieldValues = widgets.reduce(
    (acc, w) => ({ ...acc, [w.id]: undefined }),
    {}
  )
  const addEmail = data.askEmail ? { emailAddress: undefined } : {}
  return {
    ...fieldValues,
    ...addEmail
  }
}

function checkEmail (data, values) {
  if (data.askEmail && !values.emailAddress) {
    return { emailAddress: 'Required' }
  }
  return {}
}

function cast (values) {
  const toObjWithValues = toObj(values)
  return Object.keys(values).reduce((acc, id) => {
    const val = values[id]
    if (id.startsWith('other_option_response')) return acc
    if (id.startsWith('emailAddress')) { return acc.concat({ key: 'emailAddress', value: val }) }

    if (Array.isArray(val)) {
      return acc.concat(
        val
          .map(v => toObjWithValues(id, v))
          .reduce((acc, val) => acc.concat(val), [])
      )
    }
    return acc.concat(toObjWithValues(id, val))
  }, [])
}

function toObj (values) {
  return (id, value) => {
    const list = []
    const key = `entry.${id}`
    if (value === '__other_option__') {
      list.push({
        key: `${key}.other_option_response`,
        value: values[`other_option_response_${id}`]
      })
    }
    return list.concat({ key, value })
  }
}
