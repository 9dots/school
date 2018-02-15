import formModal from '../../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import { message } from 'antd'

export default compose(
  formModal({
    form: 'createClass'
  }),
  connect(
    (state, props) => ({
      ok: props.close(props.onOk),
      cancel: props.close(props.onCancel)
    }),
    { rpc }
  ),
  withHandlers({
    onSubmit: ({ school, ok, setLoading, rpc }) => async values => {
      setLoading(true)
      try {
        const cls = await rpc('class.createClass', { ...values, school })
        ok(`Success! Created ${values.displayName}.`)
        await rpc('user.setNav', { class: cls.class })
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
