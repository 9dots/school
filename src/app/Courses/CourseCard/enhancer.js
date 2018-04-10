import { withRouter } from 'react-router-dom'
import modalContainer from 'components/modalContainer'
import { compose, withHandlers } from 'recompose'
import { setUrl } from '../../actions'
import { connect } from 'react-redux'

export default compose(
  withRouter,
  modalContainer,
  connect(null, { setUrl }),
  withHandlers({
    editCourse: props => async values => {
      const { setUrl, history, course } = props
      await setUrl(history, `/courses/${course.id}/edit`)
    }
  })
)
