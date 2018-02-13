import formModal from '../../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import setProp from '@f/set-prop'
import { message } from 'antd'

export default compose(
  formModal({ form: 'createStudent' }),
  connect(
    (state, props) => ({
      ok: props.close(props.onOk),
      cancel: props.close(props.onCancel)
    }),
    { rpc }
  ),
  withHandlers({
    onSubmit: props => async values => {
      const { setLoading, school, class: { id }, rpc, ok } = props
      setLoading(true)
      try {
        const res = await rpc('user.createStudent', { ...values, school })
        await rpc('class.addStudent', { class: id, student: res.student })
        ok('Success! Added student.')
      } catch (e) {
        setLoading(false)
        if (e.error === 'studentId_taken') {
          throw new SubmissionError({
            studentId: 'Student ID taken'
          })
        } else if (e.errorDetails) {
          throw new SubmissionError(
            e.errorDetails.reduce(
              (acc, { field, message }) => setProp(field, acc, message),
              {}
            )
          )
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    }
  })
)
