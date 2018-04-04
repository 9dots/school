import formModal from '../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SubmissionError } from 'redux-form'
import { rpc, setUrl } from '../actions'
import { connect } from 'react-redux'
import setProp from '@f/set-prop'
import { message } from 'antd'

export default compose(
  withRouter,
  formModal({
    form: 'createCourse'
  }),
  connect(
    (state, props) => ({
      ok: props.close(props.onOk),
      cancel: props.close(props.onCancel)
    }),
    { rpc, setUrl }
  ),
  withHandlers({
    onSubmit: props => async values => {
      const { setUrl, history, ok, setLoading, rpc } = props
      setLoading(true)
      try {
        const { course } = await rpc('course.create', values)
        ok(`Success! Created ${values.displayName}.`)
        await setUrl(history, `/courses/${course}/edit`)
      } catch (e) {
        setLoading(false)
        if (e.errorDetails) {
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
