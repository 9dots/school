import { getFormDefaults, getTaskTitle } from 'utils'
import { compose, withHandlers } from 'recompose'
import addLoading from 'components/addLoading'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  addLoading,
  connect(
    () => ({}),
    { rpc }
  ),
  withFormik({
    displayName: 'taskEditForm',
    mapPropsToValues: ({ initialValues = {} }) => {
      return {
        type: undefined,
        displayName: undefined,
        ...initialValues
      }
    },
    handleSubmit: async (values, { props }) => {
      const { setEditKey, setLoading, rpc, task } = props
      try {
        setLoading(true)
        await rpc('course.updateTask', cast(values, props))
        setLoading(false)
        setEditKey(null)
        message.success(`"${task.index + 1}. ${getTaskTitle(task)}" updated`)
      } catch (e) {
        setLoading(false)
        message.error(e.error)
      }
    },
    ...getFormDefaults(schema.course.updateTask, cast)
  })
)

function cast (values, props) {
  return {
    ...values,
    task: props.task.id,
    course: props.course,
    draft: props.draft,
    lesson: props.lesson
  }
}
