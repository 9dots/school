import { getValidationErrors, getFormDefaults } from 'utils'
import addLoading from 'components/addLoading'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  addLoading,
  connect(() => ({}), { rpc }),
  withFormik({
    displayName: 'addTask',
    mapPropsToValues: props => ({
      url: undefined
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      try {
        props.setLoading(true)
        await props.rpc('course.addTask', cast(values, props))
        props.setLoading(false)
        props.setEditKey(null)
      } catch (e) {
        props.setLoading(false)
        if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error(e.error)
      }
    },
    ...getFormDefaults(schema.course.addTask, cast)
  })
)

function cast (values, props) {
  return {
    ...values,
    lesson: props.lesson,
    draft: props.draft,
    course: props.course
  }
}
