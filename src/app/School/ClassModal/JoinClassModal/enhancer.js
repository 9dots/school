import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import formModal from 'components/formModal'
import { schoolClasses } from 'selectors'
import { getFormDefaults } from 'utils'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'
import schema from 'school-schema'
import { message } from 'antd'

export default compose(
  connect(
    (state, { school }) => ({
      school
    }),
    { rpc }
  ),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: ['school', '==', props.school],
      storeAs: `${props.school}-classes`
    }
  ]),
  connect((state, { school }) => ({
    classes: schoolClasses(state, school).filter(s => {
      return !s.teachers[state.firebase.auth.uid]
    })
  })),
  formModal({
    displayName: 'addToClass',
    mapPropsToValues: props => ({ class: undefined }),
    handleSubmit: async (values, { props }) => {
      props.setLoading(true)
      try {
        await props.rpc('class.addTeacher', cast(values, props))
        props.onOk('Successfully joined class')
      } catch (e) {
        message.error(e.error)
      }
      props.setLoading(false)
    },
    ...getFormDefaults(schema.class.addTeacher, cast)
  })
)

function cast (values, props) {
  return values
}
