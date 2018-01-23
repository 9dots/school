import { reduxForm, SubmissionError } from 'redux-form'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../actions'

export default compose(
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  reduxForm({
    form: 'onboarding'
  }),
  connect(
    ({
      firebase: { auth: { uid } },
      firestore: { ordered: { schools = [] } }
    }) => ({
      schools: schools.map(school => ({
        label: school.displayName,
        value: school.id
      })),
      uid
    })
  ),
  withHandlers({
    onSubmit: ({ teacherSignUp, form, uid, dispatch }) => values => {
      console.log(values)
      return dispatch(
        rpc('user.teacherSignUp', {
          teacher: uid,
          ...values
        })
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
        })
        .catch(e => {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        })
    }
  })
)
