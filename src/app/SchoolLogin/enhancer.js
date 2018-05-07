import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { compose } from 'recompose'

export default compose(
  connect((state, { match: { params: { schoolId, classId } } }) => ({
    schoolId,
    classId
  })),
  firestoreConnect(({ schoolId }) => [
    {
      collection: 'classes',
      where: ['school', '==', schoolId],
      storeAs: `${schoolId}-classes`
    },
    {
      collection: 'schools',
      doc: schoolId,
      storeAs: schoolId
    }
  ]),
  connect(({ firestore: { data } }, { schoolId }) => ({
    school: data[schoolId],
    classes: values(data[`${schoolId}-classes`])
  })),
  waitFor(['school', 'classes'])
)

function values (obj) {
  if (obj) return Object.keys(obj).map(k => ({ id: k, ...obj[k] }))
}
