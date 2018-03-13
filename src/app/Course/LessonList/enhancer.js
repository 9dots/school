import waitFor from '../../../components/waitFor/waitFor'
import { firestoreConnect } from 'react-redux-firebase'
import { studentAssignment } from '../../../selectors'
import { compose } from 'recompose'
import { connect } from 'react-redux'

export default compose(
  firestoreConnect(
    ({ lessons, student }) =>
      student
        ? lessons.map(lesson => ({
          collection: 'activities',
          where: [['student', '==', student], ['lesson', '==', lesson.id]],
          storeAs: `lessonProgress-${lesson.id}-${student}`
        }))
        : []
  ),
  connect((state, { lessons, student }) => ({
    progress: lessons.reduce(
      (acc, lesson) => ({
        ...acc,
        [lesson.id]: studentAssignment(state, student, lesson.id)
      }),
      {}
    )
  })),
  waitFor(['progress'])
)
