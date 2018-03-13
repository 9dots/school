import waitFor from '../../../../../components/waitFor/waitFor'
import { studentAssignment } from '../../../../../selectors'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import find from 'lodash/find'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [['student', '==', 'uid'], ['lesson', '==', 'props.lessonId']],
      storeAs: `lessonProgress-${props.assignedLesson.id}-${props.uid}`
    }
  ]),
  connect((state, { assignedLesson, uid }) => {
    const progress = studentAssignment(state, uid, assignedLesson.id) || {}
    return {
      progress: assignedLesson.tasks.map(t =>
        find(progress, p => p.task === t.id)
      )
    }
  }),
  waitFor(['progress'])
)
