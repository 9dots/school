import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }, { location: { pathname } }) => ({
    profile
  })),
  withHandlers({
    logout: props => event => {
      switch (event.key) {
        case 'logout':
          return props.firebase
            .logout()
            .then(() => (window.location = window.location.origin))
        default:
          break
      }
    }
  })
)
