import { compose, withHandlers } from 'recompose'
import formModal from 'components/formModal'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { validate } from 'utils'
import { message } from 'antd'
import map from '@f/map'

export default compose(
  connect(
    null,
    { rpc }
  ),
  formModal({
    displayName: 'createStudents',
    mapPropsToValues: ({ data = {} }) => ({
      ...map((value, key) => ({ key, ...value }), data)
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const {
        class: { id },
        setLoading,
        rpc
      } = props
      setLoading(true)
      try {
        const { add = [] } = await rpc(
          'user.createStudents',
          cast(values, props)
        )
        const students = add.filter((val, i) => values[i] !== true)
        await rpc('class.addStudents', { students, class: id })
        props.onOk(null)
      } catch (e) {
        setLoading(false)
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
    validate: validate(schema.user.createStudents, cast)
  }),
  withHandlers({
    removeRow: ({ values, validateForm, setValues }) => key => {
      const newVals = Object.keys(values).reduce((acc, indexString) => {
        const index = Number(indexString)

        const value = values[index]
        if (index > key) {
          acc[index - 1] = {
            ...value,
            key: value.key - 1
          }
        } else if (index < key) {
          acc[index] = value
        }
        return acc
      }, {})

      setValues(newVals)
      validateForm(newVals)

      message.success('Row Removed')
    }
  })
)

function cast (values, props) {
  return mapValues(
    value => ({
      ...value,
      email: value.email || undefined,
      school: props.school
    }),
    values
  )
}
