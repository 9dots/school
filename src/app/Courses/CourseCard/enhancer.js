import modalContainer from 'components/modalContainer'
import { compose, withHandlers } from 'recompose'
import { setUrl, rpc } from 'app/actions'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'

export default compose(
  modalContainer,
  connect(null, { setUrl, rpc }),
  withHandlers({
    editCourse: props => values => {
      if (props.course.published) {
        Modal.confirm({
          title: `Edit "${props.course.displayName}"?`,
          content: 'This course will no longer be published.',
          okText: 'Yes',
          cancelText: 'No',
          async onOk () {
            try {
              await props.rpc('course.unpublish', {
                course: props.course.id
              })
              props.setUrl(`/courses/${props.course.id}/edit`)
            } catch (e) {
              message.error(e.message)
            }
          }
        })
      } else {
        props.setUrl(`/courses/${props.course.id}/edit`)
      }
    }
  })
)
