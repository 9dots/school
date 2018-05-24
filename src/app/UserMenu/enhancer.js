import { uid } from '../../selectors'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  modalContainer,
  connect(state => ({
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      storeAs: props.uid
    }
  ]),
  connect(({ firestore: { data } }, { uid }) => ({
    user: data[uid]
  })),
  withHandlers({
    menuClick: ({ user, logout, modal, uid }) => event => {
      switch (event.key) {
        case 'logout':
          return logout()
        case 'settings': {
          return modal.showModal(
            { name: 'editUser', user: { id: uid, ...user } },
            null
          )
        }
        default:
          break
      }
    }
  })
)
