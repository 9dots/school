import { compose, withHandlers } from 'recompose'
import addLoading from 'components/addLoading'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { rpc } from 'app/actions'

export default compose(
  addLoading,
  connect(() => ({}), { rpc }),
  withHandlers({
    removeTask: ({ rpc, draft, course, lesson, task }) => () => {
      Modal.confirm({
        title: `Remove "${task.displayName}"?`,
        content: 'Task will be removed from this lesson.',
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await rpc('course.removeTask', {
              course,
              draft,
              lesson,
              task: task.id
            })
            message.success(`"${task.displayName}" removed`)
          } catch (e) {
            message.error(e.error)
          }
        }
      })
    },
    editTask: props => async values => {
      const { setEditKey, setLoading, rpc, course, draft, lesson, task } = props
      try {
        setLoading(true)
        await rpc('course.updateTask', {
          course,
          lesson,
          draft,
          task: task.id,
          ...values
        })
        setLoading(false)
        setEditKey(null)
        message.success(`"${task.displayName}" updated`)
      } catch (e) {
        setLoading(false)
        message.error(e.error)
      }
    }
  })
)
