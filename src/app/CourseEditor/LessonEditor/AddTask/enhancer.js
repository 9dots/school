import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import addLoading from 'components/addLoading'
import { getValidationErrors } from 'utils'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  addLoading,
  reduxForm({ form: 'addTask' }),
  connect(() => ({}), { rpc }),
  withHandlers({
    onSubmit: props => async values => {
      try {
        props.setLoading(true)
        await props.rpc('course.addTask', {
          ...values,
          lesson: props.lesson,
          draft: props.draft,
          course: props.course
        })
        props.setLoading(false)
        props.setEditKey(null)
      } catch (e) {
        props.setLoading(false)
        if (e.errorDetails) {
          throw new SubmissionError(getValidationErrors(e))
        }
        message.error(e.error)
      }
    }
  })
)
