import { progressByStudent, students as studentsSelector } from 'selectors'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import { compose } from 'recompose'
import getProp from '@f/get-prop'

export default compose(
  firestoreConnect(({ students = {}, classLesson, assignedLesson }) =>
    Object.keys(students)
      .map(student => ({
        collection: 'users',
        doc: student,
        storeAs: student
      }))
      .concat(
        assignedLesson
          ? {
            collection: 'modules',
            doc: classLesson.module,
            subcollections: [
              {
                collection: 'progress',
                doc: classLesson.id,
                subcollections: [{ collection: 'users' }]
              }
            ],
            storeAs: classLesson.module + '-' + classLesson.id
          }
          : []
      )
  ),
  connect((state, { assignedLesson, classLesson, students, classId }) => {
    const progress = progressByStudent(
      state,
      assignedLesson,
      students,
      classLesson.module,
      classId
    )
    return {
      studentData: studentsSelector(state, students),
      progressByStudent: progress,
      activeByTask: getActive(assignedLesson, progress)
    }
  }),
  waitFor(['progressByStudent', 'studentData'])
)

function getActive (assignedLesson, progress) {
  if (assignedLesson) {
    return (assignedLesson.tasks || []).map(({ id }) =>
      mapValues(
        (val, key) => val.active === id && val.student,
        progress || {}
      ).filter(student => student)
    )
  }
}
