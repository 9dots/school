import { getFormDefaults, getValidationErrors, trimValues } from 'utils'
import formModal from 'components/formModal'
import { rpc, setUrl } from '../actions'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { message } from 'antd'
import pick from '@f/pick'

const submitKeys = [
  'course',
  'displayName',
  'difficulty',
  'description',
  'duration',
  'grade',
  'tags'
]

export default compose(
  connect(
    () => ({}),
    { rpc, setUrl }
  ),
  formModal({
    displayName: 'createCourse',
    mapPropsToValues: ({ initialValues = {} }) => ({
      displayName: undefined,
      description: undefined,
      tags: undefined,
      grade: undefined,
      duration: {
        time: undefined,
        unit: undefined,
        ...initialValues.duration
      },
      ...initialValues
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const { setLoading, rpc, edit } = props
      const fn = edit ? 'course.update' : 'course.create'
      setLoading(true)
      try {
        const { course } = await rpc(fn, {
          ...cast(values),
          course: props.courseId,
          draft: props.draft
        })
        props.onOk(course)
        if (!edit) {
          message.success(`Success! Created ${values.displayName}.`)
        }
      } catch (e) {
        setLoading(false)
        if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.course.create, cast)
  })
)

function cast (values) {
  const trimmed = trimValues(values)
  const { grade = '', tags = [], duration = {} } = trimmed
  return {
    ...pick(submitKeys, trimmed),
    grade: grade.length
      ? grade.split(',').reduce((acc, g) => ({ ...acc, [g]: true }), {})
      : undefined,
    duration: {
      time: Number(duration.time || 0) || undefined,
      unit: (duration.unit || '').toLowerCase() || undefined
    },
    tags: tags.length
      ? tags.reduce((acc, val, key) => ({ ...acc, [val]: true }), {})
      : undefined
  }
}
