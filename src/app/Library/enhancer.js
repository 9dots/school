import modalContainer from '../../components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import { compose, withHandlers } from 'recompose'
import { courses, uid } from '../../selectors'
import { connect } from 'react-redux'
import { message } from 'antd'

export default compose(
  modalContainer,
  withHandlers({
    onCreateCourse: props => msg => {
      props.hideModal('createCourse')
      message.success(msg)
    }
  }),
  connect((state, props) => ({
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'courses',
      where: ['owner', '==', 'GcJyzb0oWSP493THvNUqnMrHlTw2' /* props.uid */]
    }
  ]),
  connect((state, props) => ({
    courses: courses(state)
  })),
  waitFor(['courses'])
)
