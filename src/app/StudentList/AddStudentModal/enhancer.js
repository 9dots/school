import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { rpc } from '../../actions'

export default compose(
  reduxForm({
    form: 'addStudent'
  }),
  withHandlers({
    onSubmit: ({ dispatch, school, onOk }) => values => {
      return dispatch(
        rpc('class.addStudent', {
          ...values,
          school
        })
      )
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
