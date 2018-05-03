import { getFormDefaults, getValidationErrors } from 'utils'
import { SubmissionError } from 'redux-form'
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
    mapPropsToValues: props => ({
      name: { given: '', family: '' },
      studentId: ''
    }),
    handleSubmit: async (values, handbag) => {
      const { props } = handbag
      const {
        class: { id },
        setLoading,
        school,
        rpc
      } = props

      setLoading(true)
      try {
        const res = await rpc('user.createStudent', {
          ...values,
          school
        })
        await rpc('class.addStudent', { class: id, student: res.student })
        message.success('Success! Added student.')
        props.onOk('done')
      } catch (e) {
        setLoading(false)
        if (e.error === 'studentId_taken') {
          throw new SubmissionError({
            studentId: 'Student ID taken'
          })
        } else if (e.errorDetails) {
          throw new SubmissionError(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.default.user.createStudent, cast)
  })
)

function cast (values, props) {
  return {
    ...values,
    email: values.email || undefined,
    school: props.school
  }
}
