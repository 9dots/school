import modalContainer from '../../../components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import { students } from '../../../selectors'
import { connect } from 'react-redux'
import { compose } from 'recompose'

export default compose(
  modalContainer,
  connect((state, { match: { params: { classId } }, classes = [] }) => ({
    cls: classes.find(c => c.id === classId) || {}
  })),
  firestoreConnect(({ cls, classId, schoolId }) => [
    ...Object.keys(cls.students || {}).map(student => ({
      collection: 'users',
      doc: student,
      storeAs: student
    }))
  ]),
  connect((state, { cls }) => ({
    students: students(state, cls.students || {})
  }))
)
