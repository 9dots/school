import { firestoreConnect } from 'react-redux-firebase'
import formModal from 'components/formModal'
import { getFormDefaults } from 'utils'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { rpc } from '../../actions'
import schema from 'school-schema'
import { message } from 'antd'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      where: [`schools.${props.school}`, '==', true],
      storeAs: 'studentList'
    }
  ]),
  connect(
    (
      {
        firestore: {
          data,
          ordered: { studentList = [] }
        }
      },
      props
    ) => ({
      studentList: studentList.filter(
        ({ id }) => !(props.class.students || {})[id]
      )
    }),
    { rpc }
  ),
  formModal({
    displayName: 'addStudentToClass',
    mapPropsToValues: props => ({ class: undefined }),
    handleSubmit: async (values, { props }) => {
      props.setLoading(true)
      try {
        await props.rpc('class.addStudent', cast(values, props))
        props.onOk('Successfully added.')
      } catch (e) {
        message.error(e.error)
      }
      props.setLoading(false)
    },
    ...getFormDefaults(schema.class.addStudent, cast)
  })
)

function cast (values, props) {
  return {
    class: props.class.id,
    student: values.student
  }
}
