import modalContainer from 'components/modalContainer'
import { compose, withHandlers } from 'recompose'
import { setUrl, rpc } from 'app/actions'
import { connect } from 'react-redux'

export default compose(
  modalContainer,
  connect(null, { setUrl, rpc }),
  withHandlers({
    editCourse: props => values => {
      props.setUrl(`/course/${props.course.id}/edit`)
    }
  })
)
