import { compose } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import waitFor from 'components/waitFor/waitFor'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'classes',
      doc: props.classId,
      storeAs: props.classId
    }
  ]),
  connect(({ firebase: { auth }, firestore: { data } }, props) => ({
    classData: data[props.classId],
    auth
  })),
  waitFor(['classData'])
)
