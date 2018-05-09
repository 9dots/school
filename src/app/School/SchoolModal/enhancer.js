import { firestoreConnect } from 'react-redux-firebase'
import formModal from 'components/formModal'
import { rpc, setUrl } from 'app/actions'
import waitFor from 'components/waitFor'
import { getFormDefaults } from 'utils'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import PropTypes from 'prop-types'
import { message } from 'antd'

import './SchoolModal.less'

export default compose(
  firestoreConnect([{ collection: 'schools', orderBy: ['displayName'] }]),
  connect(
    (
      {
        firebase: { profile, auth },
        firestore: {
          ordered: { schools = [] }
        }
      },
      props
    ) => ({
      schools: schools.filter(s => !profile.schools[s.id]).map(school => ({
        label: school.displayName,
        value: school.id
      })),
      uid: auth.uid
    }),
    { rpc, setUrl }
  ),
  formModal({
    displayName: 'createSchool',
    mapPropsToValues: props => ({ school: undefined }),
    handleSubmit: async (values, { props, setErrors }) => {
      const { rpc, setLoading } = props
      setLoading(true)
      try {
        await rpc('user.addToSchool', cast(values, props))
        props.onOk('Success! Joined school.')
      } catch (e) {
        setLoading(false)
        if (e === 'school_not_found') {
          return setErrors({
            school: 'School code not found.'
          })
        }
        message.error('Unknown error. Please try again.')
      }
    },
    ...getFormDefaults(schema.user.addToSchool, cast)
  }),
  waitFor(['schools'])
)

function cast (values, props) {
  return {
    ...values,
    user: props.uid,
    role: 'teacher'
  }
}
