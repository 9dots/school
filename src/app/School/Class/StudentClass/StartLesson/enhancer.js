import waitFor from '../../../../../components/waitFor/waitFor'
import { studentAssignment } from '../../../../../selectors'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      subcollections: [{ collection: 'assignments', doc: props.lesson.id }]
    }
  ]),
  connect((state, { lesson, uid }) => ({
    assignedLesson: studentAssignment(state, uid, lesson.id)
  })),
  waitFor(['assignedLesson'])
)
