import { compose, withHandlers } from 'recompose'
import formModal from 'components/formModal'
import mapValues from '@f/map-values'
import schema from 'school-schema'
import { validate } from 'utils'
import { message } from 'antd'
import omit from '@f/omit'

export default compose(
  formModal({
    displayName: 'createStudents',
    mapPropsToValues: ({ data = {} }) => ({
      ...data
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      console.log(values)
      // const {
      //   class: { id },
      //   setLoading,
      //   rpc
      // } = props
      // setLoading(true)
    },
    validateOnChange: false,
    validateOnBlur: true,
    validate: validate(schema.user.createStudents, cast)
  }),
  withHandlers({
    removeRow: ({ values, update, setState, setValues }) => key => {
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
