import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import { compose, withState } from 'recompose'
import waitFor from '../../components/waitFor'
import { course } from '../../selectors'
import { connect } from 'react-redux'
import { setUrl } from 'app/actions'

export default compose(
  modalContainer,
  connect(
    (state, { match: { params: { courseId } } }) => ({
      courseId
    }),
    { setUrl }
  ),
  withState('editKey', 'setEditKey', null),
  withState('mode', 'setMode', 'edit'),
  firestoreConnect(props => [
    {
      collection: 'courses',
      doc: props.courseId,
      storeAs: props.courseId
    }
  ]),
  connect((state, props) => ({ course: course(state, props.courseId) })),
  waitFor(['course'])
)
