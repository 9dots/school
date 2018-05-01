import addLoading from 'components/addLoading/addLoading'
import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { getValidationErrors } from 'utils'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'
import { message } from 'antd'
import omit from '@f/omit'

export default compose(
  addLoading,
  reduxForm({ form: 'lessonForm' }),
  connect(() => ({}), { rpc }),
  withHandlers({
    onSubmit: props => async values => {
      try {
        props.setLoading(true)
        await props.rpc(`course.${props.mode}`, {
          ...omit('tasks', values),
          lesson: props.lesson,
          course: props.course,
          draft: props.draft
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
