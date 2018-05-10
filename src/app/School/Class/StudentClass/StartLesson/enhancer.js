import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor/waitFor'
import { studentAssignment } from 'selectors'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import find from 'lodash/find'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [
        ['student', '==', props.uid],
        ['lesson', '==', props.assignedLesson.id]
      ],
      storeAs: `lessonProgress-${props.assignedLesson.id}-${props.uid}`
    }
  ]),
  connect((state, { assignedLesson, uid }) => {
    const progress = studentAssignment(state, uid, assignedLesson.id)
    return {
      progress:
        progress === null
          ? null
          : assignedLesson.tasks.map(t =>
            find(progress || {}, p => p.task === t.id)
          )
    }
  }),
  waitFor(['progress'])
)
