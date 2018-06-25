import { compose, withHandlers } from 'recompose'
import { getTaskTitle } from 'utils'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { rpc } from 'app/actions'

export default compose(
  connect(
    () => ({}),
    { rpc }
  ),
  withHandlers({
    removeTask: ({ rpc, draft, course, lesson, task }) => () => {
      Modal.confirm({
        title: `Remove "${task.index + 1}. ${getTaskTitle(task)}"?`,
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
            message.success(
              `"${task.index + 1}. ${getTaskTitle(task)}" removed`
            )
          } catch (e) {
            message.error(e.error)
          }
        }
      })
    }
  })
)
