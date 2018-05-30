import { compose, withHandlers } from 'recompose'
import formModal from 'components/formModal'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { validate } from 'utils'
import { message } from 'antd'
import omit from '@f/omit'

export default compose(
  connect(null, { rpc }),
  formModal({
    displayName: 'createStudents',
    mapPropsToValues: ({ data = {} }) => ({
      ...data
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
    removeRow: ({ values, update, setState, setValues }) => key => {
      console.log(values, key, omit(key, values))
      setValues(omit(key, values))

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
