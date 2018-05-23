import { getFormDefaults, getValidationErrors } from 'utils'
import formModal from 'components/formModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  connect(() => ({}), { rpc }),
  formModal({
    displayName: 'createStudent',
    mapPropsToValues: ({ user = {} }) => ({
      name: { given: '', family: '' },
      studentId: '',
      ...user
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const {
        class: { id },
        setLoading,
        edit,
        rpc
      } = props
      const fn = edit ? 'user.editUser' : 'user.createStudent'
      setLoading(true)

      try {
        const res = await rpc(fn, cast(values, props))
        if (edit) {
          message.success('Success! Edited student.')
        } else {
          await rpc('class.addStudent', { class: id, student: res.student })
          message.success('Success! Added student.')
        }
        return props.onOk('done')
      } catch (e) {
        setLoading(false)
        if (e.error === 'studentId_taken') {
          return setErrors({
            studentId: 'Student ID taken'
          })
        } else if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    ...getFormDefaults(schema.user.createStudent, cast)
  })
)

function cast (values, props) {
  const { class: cls, school, edit } = props
  const obj = edit
    ? {}
    : {
      email: values.email || undefined,
      grade: cls.grade,
      school: school
    }

  return {
    ...values,
    ...obj
  }
}
