import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { course } from '../../selectors'
import waitFor from '../../components/waitFor'

export default compose(
  connect((state, { match: { params: { courseId } } }) => ({
    courseId
  })),
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
