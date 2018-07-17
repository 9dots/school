import { getValidationErrors, getFormDefaults, trimValues } from 'utils'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import formModal from 'components/formModal'
import waitFor from 'components/waitFor'
import { rpc, setUrl } from '../actions'
import { connect } from 'react-redux'
import schema from 'school-schema'
import { message } from 'antd'

const profileDetailEnhancer = compose(
  formModal({
    displayName: 'onboarding',
    mapPropsToValues: props => ({
      name: {
        given: '',
        family: ''
      },
      displayName: '',
      school: ''
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const { rpc, setLoading, setUrl } = props
      setLoading(true)
      try {
        await rpc('user.teacherSignUp', cast(values, props))
        setUrl('/onboarding/class')
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          return setErrors({ school: 'School code not found.' })
        } else if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.user.teacherSignUp, cast, {
      school: 'Please choose a school.'
    })
  })
)

function cast (values, { profile, uid }) {
  return {
    ...trimValues(values),
    email: profile.email,
    teacher: uid
  }
}

const classOnboardingEnhancer = compose(
  withHandlers({
    close: ({ setUrl }) => async msg => {
      setUrl('/')
    }
  }),
  waitFor(['school'])
)

export { profileDetailEnhancer, classOnboardingEnhancer }
export default compose(
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  connect(
    ({
      firebase: {
        auth: { uid },
        profile
      },
      firestore: {
        ordered: { schools = [] }
      }
    }) => ({
      schools: schools.map(school => ({
        label: school.displayName,
        value: school.id
      })),
      school: Object.keys(profile.schools || {})[0],
      uid,
      profile
    }),
    { rpc, setUrl }
  )
)
