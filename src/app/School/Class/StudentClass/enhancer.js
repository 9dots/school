import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { compose } from 'recompose'

function getProgressString (classLesson, auth) {
  return classLesson.module + '-' + classLesson.id + '-' + auth.uid
}

export default compose(
  firestoreConnect(
    ({ assignedLesson, classLesson, auth }) =>
      assignedLesson
        ? [
          {
            collection: 'modules',
            doc: classLesson.module,
            subcollections: [
              {
                collection: 'progress',
                doc: classLesson.id,
                subcollections: [{ collection: 'users', doc: auth.uid }]
              }
            ],
            storeAs: getProgressString(classLesson, auth)
          }
        ]
        : []
  ),
  connect((state, { assignedLesson, classLesson, auth }) => ({
    progress: assignedLesson
      ? state.firestore.ordered[getProgressString(classLesson, auth)]
        ? {
          student: state.firebase.profile,
          ...state.firestore.data[getProgressString(classLesson, auth)]
        }
        : null
      : null
  })),
  waitFor(['progress'])
)
