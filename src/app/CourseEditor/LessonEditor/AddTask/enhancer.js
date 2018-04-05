import addLoading from '../../../../components/addLoading/addLoading'
import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { rpc } from '../../../actions'
import { connect } from 'react-redux'
import setProp from '@f/set-prop'
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
