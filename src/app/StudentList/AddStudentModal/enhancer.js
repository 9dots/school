import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import { rpc } from '../../actions'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      where: [`schools.${props.school}`, '==', 'student'],
      storeAs: 'studentList'
    }
  ]),
  connect(({ firestore: { data, ordered: { studentList } } }) => ({
    studentList
  })),
  withFormik({
    displayName: 'addStudent'
  }),
  withHandlers({
    onSubmit: ({ dispatch, school, onOk }) => values => {
      return dispatch(
        rpc('class.addStudent', {
          ...values,
          school
        })
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
          onOk()
        })
        .catch(e => {
          throw {
            school: 'School code not found.'
          }
        })
    }
  })
)
