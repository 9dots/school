import { getValidationErrors, ensureHttp, trimValues } from 'utils'
import { compose, withHandlers } from 'recompose'
import addLoading from 'components/addLoading'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'
import omit from '@f/omit'

export default compose(
  addLoading,
  connect(
    () => ({}),
    { rpc }
  ),
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
        .create(
          {
            fileId: files[0].id,
            supportsTeamDrives: true
          },
          { type: 'anyone', role: 'reader' }
        )
        .then(() => props.setFieldValue(name, file.url))
        .catch(e => {
          console.log(e)
          message.error(
            'Something went wrong. Make sure you have permission to share that file.'
          )
        })
    }
  })
)

function cast (values, props) {
  const trimmed = trimValues(values)
  return {
    ...omit(['tasks', 'lesson'], trimmed),
    course: props.course,
    draft: props.draft,
    slides: ensureHttp(trimmed.slides),
    lessonPlan: ensureHttp(trimmed.lessonPlan),
    ...(props.lesson ? { lesson: props.lesson } : {})
  }
}
