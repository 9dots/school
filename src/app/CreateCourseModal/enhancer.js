import formModal from '../../components/formModal'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router-dom'
import { SubmissionError } from 'redux-form'
import { rpc, setUrl } from '../actions'
import { connect } from 'react-redux'
import setProp from '@f/set-prop'
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
  withRouter,
  formModal({
    form: 'createCourse'
  }),
  connect(
    (state, props) => ({
      ok: props.close(props.onOk),
      cancel: props.close(props.onCancel)
    }),
    { rpc, setUrl }
  ),
  withHandlers({
    onSubmit: props => async values => {
      const { ok, setLoading, rpc, edit } = props
      const fn = edit ? 'course.update' : 'course.create'
      setLoading(true)
      try {
        const { course } = await rpc(fn, {
          ...formatSubmit(values),
          course: props.courseId
        })
        message.success(`Success! Created ${values.displayName}.`)
        ok(course)
      } catch (e) {
        setLoading(false)
        if (e.errorDetails) {
          throw new SubmissionError(
            e.errorDetails.reduce(
              (acc, { field, message }) => setProp(field, acc, message),
              {}
            )
          )
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    }
  })
)

function formatSubmit (values) {
  const { grade, tags = [], duration = {} } = values
  return {
    ...pick(submitKeys, values),
    grade: grade.split(',').reduce((acc, g) => ({ ...acc, [g]: true }), {}),
    duration: {
      time: Number(duration.time || 0) || undefined,
      unit: (duration.unit || '').toLowerCase() || undefined
    },
    tags: tags.reduce((acc, val, key) => ({ ...acc, [val]: true }), {})
  }
}
