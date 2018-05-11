import { studentSignIn, setUrl } from 'app/actions'
import { compose, withHandlers, lifecycle } from 'recompose'
import addLoading from 'components/addLoading'
import { errorToMessage } from 'utils/errors'
import { getFormDefaults } from 'utils'
import avatars from 'assets/avatars'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { message } from 'antd'

export default compose(
  addLoading,
  lifecycle({
    componentWillMount () {
      // pseudo random sort which works fine for our purposes here
      this.setState({ avatars: avatars.sort(() => 0.5 - Math.random()) })
    }
  }),
  connect(() => ({}), { studentSignIn, setUrl }),
  withHandlers({
    submit: props => async values => {
      try {
        props.setLoading(true)
        await props.studentSignIn(cast(values, props))
        props.setLoading(false)
        props.setUrl('/')
      } catch (e) {
        props.setLoading(false)
        if (
          e.error === 'invalid_credentials' &&
          props.passwordType === 'image'
        ) {
          return message.error('Incorrect password.')
        }
        return Promise.reject(e)
      }
    }
  }),
  withFormik({
    displayName: 'studentLogin',
    mapPropsToValues: props => ({ password: undefined }),
    handleSubmit: async (values, { props, setErrors }) => {
      try {
        await props.submit(values)
      } catch (e) {
        if (e.error === 'invalid_credentials') {
          return setErrors({ password: errorToMessage(e.error) })
        }
        message.error('Oops, something went wrong')
      }
    },
    ...getFormDefaults(schema.user.signInWithPassword, cast)
  })
)

function cast (values, props) {
  return {
    ...values,
    user: props.student.id,
    type: props.passwordType
  }
}
