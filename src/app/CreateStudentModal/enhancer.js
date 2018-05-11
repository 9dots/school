import { getFormDefaults, getValidationErrors } from 'utils'
import formModal from 'components/formModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  connect(() => ({}), { rpc }),
  formModal({
    displayName: 'createStudent',
    mapPropsToValues: ({ initialValues = {} }) => ({
      name: { given: '', family: '' },
      studentId: '',
      ...initialValues
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const {
        class: { id },
        setLoading,
        rpc
      } = props
      setLoading(true)
      try {
        const res = await rpc('user.createStudent', cast(values, props))
        await rpc('class.addStudent', { class: id, student: res.student })
        message.success('Success! Added student.')
        return props.onOk('done')
      } catch (e) {
        setLoading(false)
        if (e.error === 'studentId_taken') {
          return setErrors({
            studentId: 'Student ID taken'
          })
        } else if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.user.createStudent, cast)
  })
)

function cast (values, props) {
  return {
    ...values,
    email: values.email || undefined,
    grade: props.class.grade,
    school: props.school
  }
}
