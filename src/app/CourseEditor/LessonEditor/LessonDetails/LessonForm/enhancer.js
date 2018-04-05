import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { rpc } from '../../../../actions'
import { connect } from 'react-redux'
import setProp from '@f/set-prop'
import { message } from 'antd'
import omit from '@f/omit'
import addLoading from '../../../../../components/addLoading/addLoading'

export default compose(
  addLoading,
  reduxForm({ form: 'lessonForm' }),
  connect(() => ({}), { rpc }),
  withHandlers({
    onSubmit: props => async values => {
      try {
        props.setLoading(true)
        await props.rpc('course.updateLesson', {
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
