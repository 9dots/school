import { profile, uid, classBySchools } from '../../selectors'
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
    profile: profile(state),
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [`members.${props.uid}`, '==', true],
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
    classId: params.classId,
    nav: profile.nav
  })),
  withHandlers({
    onCreateModal: props => (msg, modal) => {
      props.hideModal(modal, null)
      message.success(msg)
    }
  }),
  withHandlers({
    logout: props => event => {
      switch (event.key) {
        case 'logout':
          return props.firebase
            .logout()
            .then(() => (window.location = window.location.origin))
        default:
          break
      }
    }
  }),
  waitFor(['classesBySchool', 'profile'])
)
