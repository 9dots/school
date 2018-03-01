import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      storeAs: props.uid
    }
  ]),
  connect(({ firestore: { data } }, props) => ({
    user: data[props.uid]
  }))
)
