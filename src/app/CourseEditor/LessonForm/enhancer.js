import { compose, withHandlers } from 'recompose'
import addLoading from 'components/addLoading'
import { getValidationErrors } from 'utils'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'
import omit from '@f/omit'

export default compose(
  addLoading,
  connect(() => ({}), { rpc }),
  withFormik({
    displayName: 'lessonForm',
    mapPropsToValues: ({ initialValues }) => ({
      displayName: '',
      slides: '',
      lessonPlan: '',
      description: '',
      ...initialValues
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      try {
        props.setLoading(true)
        await props.rpc(`course.${props.mode}`, cast(values, props))
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
    validateOnChange: true,
    validateOnBlur: false,
    validate: (values, props) => {
      const validator = schema.course[props.mode]
      const { valid, errors } = validator(cast(values, props), { greedy: true })
      if (valid) return
      return getValidationErrors({
        errorDetails: errors
      })
    }
  }),
  withHandlers({
    onGoogleDoc: props => name => files => {
      const file = files[0]
      return window.gapi.client.drive.permissions
        .create({ fileId: files[0].id }, { type: 'anyone', role: 'reader' })
        .then(() => props.setFieldValue(name, file.url))
        .catch(console.error)
    }
  })
)

function cast (values, props) {
  return {
    ...omit(['tasks', 'lesson'], values),
    course: props.course,
    draft: props.draft,
    ...(props.lesson ? { lesson: props.lesson } : {})
  }
}
