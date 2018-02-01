import { classes, school, profile, uid } from '../../selectors'
import modalContainer from '../../components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import waitFor from '../../components/waitFor'
import { connect } from 'react-redux'
import { message } from 'antd'

export default compose(
  modalContainer,
  connect((state, { match }) => ({
    school: match.params.school,
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [
        [`teachers.${props.uid}`, '==', true],
        ['school', '==', props.school]
      ],
      storeAs: `classes-${props.school}`
    },
    {
      collection: 'schools',
      storeAs: props.school,
      doc: props.school
    }
  ]),
  connect((state, { match: { params } }) => ({
    myClasses: classes(state, params.school),
    schoolData: school(state, params.school),
    profile: profile(state),
    nav: profile(state).nav,
    classId: params.classId
  })),
  withHandlers({
    onCreateClass: props => msg => {
      props.hideModal('classModal', null)
      message.success(msg)
    }
  }),
  waitFor(['myClasses', 'profile', 'nav', 'schoolData'])
)
