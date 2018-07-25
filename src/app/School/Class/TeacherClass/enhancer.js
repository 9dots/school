import { progressByStudent, students as studentsSelector } from 'selectors'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import { compose } from 'recompose'
import getProp from '@f/get-prop'

export default compose(
  firestoreConnect(({ students, classLesson, assignedLesson }) =>
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
  connect((state, { assignedLesson, classLesson, students }) => ({
    studentData: studentsSelector(state, students),
    progressByStudent: progressByStudent(
      state,
      assignedLesson,
      students,
      classLesson.module
    ),
    activeByTask: getActive(state, assignedLesson, students, classLesson.module)
  })),
  waitFor(['progressByStudent', 'studentData'])
)

function getActive (state, assignedLesson, students, mod) {
  const studentProgress = progressByStudent(
    state,
    assignedLesson,
    students,
    mod
  )
  if (assignedLesson) {
    return (assignedLesson.tasks || []).map(({ id }) =>
      mapValues(
        (val, key) => isActive(val, id) && val.student,
        studentProgress || {}
      ).filter(student => student)
    )
  }
}

function isActive (prog, lessonId) {
  return (getProp('progress', prog) || []).some(
    p => p.active && p.task === lessonId
  )
}
