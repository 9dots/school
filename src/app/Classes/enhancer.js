import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import getProp from '@f/get-prop'
import { compose } from 'recompose'
import './Classes.less'

export default compose(
  connect(({ firebase: { auth, profile = {} } }) => ({
    profile,
    uid: auth.uid
  })),
  firestoreConnect(props => [
    ...mapValues(
      (school, key) => ({
        collection: 'schools',
        doc: key,
        storeAs: key
      }),
      props.profile.schools
    ),
    {
      collection: 'classes',
      where: [
        ['school', '==', getProp('profile.nav.school', props) || null],
        [`teachers.${props.uid}`, '==', true]
      ],
      storeAs: 'myClasses'
    }
  ]),
  ModalContainer,
  connect(({ firestore: { data, ordered: { myClasses } } }, { profile }) => ({
    currentSchool: getSchool(data, profile),
    myClasses
  }))
)

function getSchool (data, profile) {
  const schoolId = profile.nav
    ? profile.nav.school
    : Object.keys(profile.schools)[0]
  return { ...data[schoolId], id: schoolId }
}
