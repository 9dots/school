import { reduxForm, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { rpc } from '../../actions'

export default compose(
  reduxForm({
    form: 'createClass'
  }),
  withHandlers({
    onSubmit: ({ dispatch, school, onOk }) => values => {
      return dispatch(
        rpc('class.createClass', {
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
          console.error(e)
          throw new SubmissionError({
            school: 'School code not found.'
          })
        })
    }
  })
)
