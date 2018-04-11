import modalContainer from '../../components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import { compose, withHandlers } from 'recompose'
import { courses, uid } from '../../selectors'
import { connect } from 'react-redux'
import { setUrl } from 'app/actions'

export default compose(
  modalContainer,
  connect(
    (state, props) => ({
      uid: uid(state)
    }),
    { setUrl }
  ),
  withHandlers({
    onCreateCourse: props => course => {
      props.hideModal('createCourse')
      props.setUrl(`/courses/${course}/edit`)
    }
  }),
  firestoreConnect(({ uid }) => [
    {
      collection: 'courses',
      where: ['owner', '==', uid]
    }
  ]),
  connect((state, props) => ({
    courses: courses(state)
  })),
  waitFor(['courses'])
)
