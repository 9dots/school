import formModal from '../../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'
import { rpc, setUrl } from '../../actions'
import { connect } from 'react-redux'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'

export default compose(
  withRouter,
  formModal({
    form: 'createClass'
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
      const { setUrl, history, school, ok, setLoading, rpc } = props
      setLoading(true)
      try {
        const cls = await rpc('class.createClass', { ...values, school })
        ok(`Success! Created ${values.displayName}.`)
        await rpc('user.setNav', { class: cls.class })
        await setUrl(history, `/class/${cls.class}`)
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    }
  })
)
