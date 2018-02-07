import { firestoreConnect } from 'react-redux-firebase'
import formModal from '../../components/formModal'
import { compose, withHandlers } from 'recompose'
import waitFor from '../../components/waitFor'
import { withRouter } from 'react-router-dom'
import { SubmissionError } from 'redux-form'
import { rpc, setUrl } from '../actions'
import { connect } from 'react-redux'
import { message } from 'antd'

const profileDetailEnhancer = compose(
  formModal({ form: 'onboarding' }),
  withHandlers({
    onSubmit: ({ history, uid, rpc, setLoading, setUrl }) => async values => {
      setLoading(true)
      try {
        await rpc('user.teacherSignUp', { teacher: uid, ...values })
        setUrl(history, '/onboarding/class')
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

const classOnboardingEnhancer = compose(
  withHandlers({
    close: ({ history, setUrl }) => async msg => {
      setUrl(history, '/')
    }
  })
)

export { profileDetailEnhancer, classOnboardingEnhancer }
export default compose(
  withRouter,
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  connect(
    ({
      firebase: { auth: { uid }, profile },
      firestore: { ordered: { schools = [] } }
    }) => ({
      schools: schools.map(school => ({
        label: school.displayName,
        value: school.id
      })),
      school: Object.keys(profile.schools || {})[0],
      uid
    }),
    { rpc, setUrl }
  ),
  waitFor(['school'])
)
