import { reduxForm, SubmissionError } from 'redux-form'
import { firestoreConnect } from 'react-redux-firebase'
import formModal from '../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../actions'
import { message } from 'antd'

export default compose(
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  formModal({
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
    }),
    { rpc }
  ),
  withHandlers({
    onSubmit: ({ uid, dispatch, rpc, setLoading }) => async values => {
      setLoading(true)
      try {
        await rpc('user.teacherSignUp', { teacher: uid, ...values })
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        }
        message.error('Unknown error. Please try again.')
      }
    }
  })
)
