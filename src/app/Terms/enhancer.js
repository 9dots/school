import modalContainer from '../../components/modalContainer'
import { compose, withHandlers, lifecycle } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import addLoading from 'components/addLoading'
import { profile } from '../../selectors'
import { connect } from 'react-redux'
import { setUrl } from '../actions'
import { rpc } from 'app/actions'
import { message } from 'antd'
import { version } from './Terms'

export default compose(
  addLoading,
  connect(
    state => ({
      profile: profile(state)
    }),
    { setUrl, rpc }
  ),
  firestoreConnect(),
  lifecycle({
    componentWillUpdate ({ profile }) {
      if (profile.termsVersion >= version) {
        this.props.setUrl('/')
      }
    }
  }),
  withHandlers({
    logout: props => {
      return props.firebase
        .logout()
        .then(() => (window.location = window.location.origin))
    },
    submit: ({ rpc, setLoading }) => async version => {
      setLoading(true)
      try {
        await rpc('user.setTermsVersion', { version: parseInt(version, 10) })
      } catch (e) {
        message.error('Something went wrong. Please try again.')
      }
      setLoading(false)
    }
  })
)
