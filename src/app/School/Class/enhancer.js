import modalContainer from '../../../components/modalContainer'
import { compose, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../../components/waitFor'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import { message } from 'antd'

export default compose(
  modalContainer,
  connect((state, { match: { params: { classId, school } } }) => ({
    classId,
    school
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      doc: props.classId,
      storeAs: props.classId
    }
  ]),
  connect(
    ({ firestore: { data } }, props) => ({
      classData: data[props.classId]
    }),
    { rpc }
  ),
  lifecycle({
    componentWillMount () {
      const { school, classId } = this.props
      this.props.rpc('user.setNav', { class: classId, school })
    }
  }),
  withHandlers({
    addStudentSuccess: props => msg => {
      props.hideModal('createStudent', null)
      message.success(msg)
    }
  }),
  waitFor(['classData'])
)
