import { allClasses, profile, uid, classBySchools } from '../../selectors'
import modalContainer from '../../components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import waitFor from '../../components/waitFor'
import mapValues from '@f/map-values'
import { connect } from 'react-redux'
import { message } from 'antd'

export default compose(
  modalContainer,
  connect((state, { match }) => ({
    school: match.params.school,
    profile: profile(state),
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [[`teachers.${props.uid}`, '==', true]],
      storeAs: `allClasses`
    },
    ...mapValues(
      (val, school) => ({
        collection: 'schools',
        doc: school,
        storeAs: school
      }),
      props.profile.schools
    )
  ]),
  connect((state, { profile, match: { params } }) => ({
    classesBySchool: classBySchools(state, Object.keys(profile.schools)),
    myClasses: allClasses(state),
    classId: params.classId,
    nav: profile.nav
  })),
  withHandlers({
    onCreateModal: props => (msg, modal) => {
      props.hideModal(modal, null)
      message.success(msg)
    }
  }),
  waitFor(['classesBySchool', 'myClasses', 'profile', 'nav'])
)
