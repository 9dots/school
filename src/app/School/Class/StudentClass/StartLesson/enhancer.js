import waitFor from '../../../../../components/waitFor/waitFor'
import { studentAssignment } from '../../../../../selectors'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [['student', '==', 'uid'], ['lesson', '==', 'props.lessonId']],
      storeAs: `lessonProgress-${props.lesson.id}-${props.uid}`
    }
  ]),
  connect((state, { lesson, uid }) => ({
    progress: studentAssignment(state, uid, lesson.id)
  })),
  waitFor(['progress'])
)
