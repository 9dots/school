import { validate, getValidationErrors } from 'utils'
import formModal from 'components/formModal'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'
import pick from '@f/pick'

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
      const { setLoading, edit, rpc, class: cls } = props
      const fn = edit ? 'user.editUser' : 'user.createStudent'
      setLoading(true)

      try {
        const res = await rpc(fn, cast(values, props))
        if (edit) {
          message.success('Success! Edited user.')
        } else {
          await rpc('class.addStudent', {
            class: cls.id,
            student: res.student
          })
          message.success('Success! Added student.')
        }
        return props.onOk('done')
      } catch (e) {
        setLoading(false)
        if (e.error === 'studentId_taken') {
          return setErrors({
            studentId: 'Student ID taken'
          })
        } else if (e.error === 'username_taken') {
          return setErrors({
            username: 'Username taken'
          })
        } else if (e.errorDetails) {
          return setErrors(getValidationErrors(e))
        }
        message.error('Oops, something went wrong. Please try again.')
      }
    },
    validateOnChange: true,
    validateOnBlur: false,
    validate: (values, { edit }) => {
      const validator = edit ? schema.user.editUser : schema.user.createStudent
      return validate(validator, cast)
    }
  })
)

function cast (values, props) {
  const { class: cls, school, edit } = props
  console.log({
    studentId: values.studentId || undefined,
    username: values.username,
    name: values.name,
    id: values.id
  })
  return edit
    ? {
      studentId: values.studentId || undefined,
      username: values.username,
      name: values.name,
      id: values.id
    }
    : {
      ...values,
      email: values.email || undefined,
      grade: cls.grade,
      school: school
    }
}
