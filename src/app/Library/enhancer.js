import modalContainer from '../../components/modalContainer'
import { compose, withHandlers } from 'recompose'
import { message } from 'antd'

export default compose(
  modalContainer,
  withHandlers({
    onCreateCourse: props => msg => {
      props.hideModal('createCourse')
      message.success(msg)
    }
  })
)
