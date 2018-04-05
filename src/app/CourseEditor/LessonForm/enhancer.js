import addLoading from 'components/addLoading/addLoading'
import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'
import setProp from '@f/set-prop'
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
          course: props.course
        })
        props.setLoading(false)
        props.setEditKey(null)
      } catch (e) {
        props.setLoading(false)
        if (e.errorDetails) {
          throw new SubmissionError(
            e.errorDetails.reduce(
              (acc, { field, message }) => setProp(field, acc, message),
              {}
            )
          )
        }
        message.error(e.error)
      }
    }
  })
)
