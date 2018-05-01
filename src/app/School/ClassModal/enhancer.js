import formModal from '../../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SubmissionError } from 'redux-form'
import { rpc, setUrl } from '../../actions'
import { getValidationErrors } from 'utils'
import { connect } from 'react-redux'
import { message } from 'antd'

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
      const { setUrl, school, ok, setLoading, rpc } = props
      setLoading(true)
      try {
        const cls = await rpc('class.createClass', {
          ...values,
          grade: Number(values.grade),
          school
        })
        ok(`Success! Created ${values.displayName}.`)
        await rpc('user.setNav', { class: cls.class })
        await setUrl(`/class/${cls.class}`)
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        } else if (e.errorDetails) {
          throw new SubmissionError(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    }
  })
)
