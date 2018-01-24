import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { rpc } from '../../actions'

export default compose(
  reduxForm({
    form: 'createStudent'
  }),
  withHandlers({
    onSubmit: ({ dispatch, school, classId, onOk }) => values => {
      return dispatch(
        rpc('user.createStudent', {
          ...values,
          school
        })
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
          return dispatch(
            rpc('class.addStudent', {
              class: '26rMGzhQMbs6v40oWGOu',
              student: res.student
            })
          )
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
          onOk()
        })
        .catch(e => {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        })
    }
  })
)
