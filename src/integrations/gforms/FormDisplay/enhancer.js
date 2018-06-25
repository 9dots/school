import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'
import { setUrl } from 'app/actions'
import { withFormik } from 'formik'
import setProp from '@f/set-prop'
import data from './test'

const fields = data.fields
const widgets = fields
  .reduce((acc, f) => acc.concat(f.widgets), [])
  .filter(w => !!w)

export default compose(
  connect(
    null,
    { setUrl }
  ),
  withFormik({
    displayName: 'displayForm',
    handleSubmit: (values, { props }) => {
      const vals = cast(values).concat({
        key: 'pageHistory',
        value: Array.from({ length: 2 }, (v, i) => i).join(',')
      })
      const params = new URLSearchParams()
      vals.forEach(val => params.append(val.key, val.value))
      fetch(
        `https://docs.google.com${data.path}/d/${data.action}/formResponse`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          mode: 'no-cors',
          body: params
        }
      )
        .then(res => props.setUrl('/'))
        .catch(e => props.setUrl('/'))
    },
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
    if (id.startsWith('emailAddress')) {
      return acc.concat({ key: 'emailAddress', value: val })
    }

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
