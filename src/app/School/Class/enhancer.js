import modalContainer from '../../../components/modalContainer'
import { compose, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import { progressByStudent } from '../../../selectors'
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
      classData: data[props.classId] || {},
      assignedLesson: (data[props.classId] || {}).assignedLesson || {},
      students: (data[props.classId] || {}).students || {}
    }),
    { rpc }
  ),
  firestoreConnect(
    ({ assignedLesson, classData, students }) =>
      assignedLesson
        ? Object.keys(students).map(student => ({
          collection: 'activities',
          where: [
            ['student', '==', student],
            ['lesson', '==', assignedLesson.id]
          ],
          storeAs: `lessonProgress-${assignedLesson.id}-${student}`
        }))
        : []
  ),
  connect((state, { assignedLesson, students }) => ({
    progressByStudent: progressByStudent(state, assignedLesson.id, students)
  })),
  lifecycle({
    componentWillMount () {
      const { classId } = this.props
      this.props.rpc('user.setNav', { class: classId })
    }
  }),
  withHandlers({
    addStudentSuccess: props => msg => {
      props.hideModal('createStudent', null)
      message.success(msg)
    }
  }),
  waitFor(['classData', 'assignedLesson'])
)
