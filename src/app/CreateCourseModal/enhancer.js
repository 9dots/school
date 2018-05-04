import { getFormDefaults, getValidationErrors } from 'utils'
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
  connect(() => ({}), { rpc, setUrl }),
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
    handleSubmit: async (values, handbag) => {
      const { props } = handbag
      const { setLoading, rpc, edit } = props
      const fn = edit ? 'course.update' : 'course.create'
      setLoading(true)
      try {
        const { course } = await rpc(fn, {
          ...cast(values),
          course: props.courseId,
          draft: props.draft
        })
        message.success(
          `Success! ${edit ? 'Saved' : 'Created'} ${values.displayName}.`
        )
        props.onOk(course)
      } catch (e) {
        setLoading(false)
        if (e.errorDetails) {
          throw getValidationErrors(e)
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.course.create, cast)
  })
)

function cast (values) {
  const { grade = '', tags = [], duration = {} } = values
  return {
    ...pick(submitKeys, values),
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
