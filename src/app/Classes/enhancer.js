import { firestoreConnect } from 'react-redux-firebase'
import ModalContainer from 'components/ModalContainer'
import { connect } from 'react-redux'
import mapValues from '@f/map-values'
import { compose } from 'recompose'
import './Classes.less'

export default compose(
  connect(({ firebase: { auth, profile } }) => ({
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
        ['school', '==', props.profile.nav.school],
        [`teachers.${props.uid}`, '==', true]
      ],
      storeAs: 'myClasses'
    }
  ]),
  ModalContainer,
  connect(
    (
      { firestore: { data, ordered: { myClasses } } },
      { profile: { nav: { school } } }
    ) => ({
      currentSchool: { ...data[school], id: school },
      myClasses
    })
  )
)
