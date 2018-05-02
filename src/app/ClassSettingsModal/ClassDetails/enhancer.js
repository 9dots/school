import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../../components/waitFor/waitFor'
import { connect } from 'react-redux'
import { compose } from 'recompose'

export default compose(
  firestoreConnect(({ classData }) => [
    ...Object.keys(classData.teachers || []).map(t => ({
      collection: 'users',
      doc: t,
      storeAs: t
    })),
    {
      collection: 'schools',
      doc: classData.school,
      storeAs: classData.school
    }
  ]),
  connect(({ firestore: { data } }, { classData }) => ({
    teachers: Object.keys(classData.teachers || []).map(t => data[t]),
    school: data[classData.school]
  })),
  waitFor(['teachers', 'school'])
)
