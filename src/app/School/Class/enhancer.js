import modalContainer from '../../../components/modalContainer'
import { compose, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../../components/waitFor'
import { connect } from 'react-redux'
import { message, Modal } from 'antd'
import { rpc } from '../../actions'
import {
  progressByStudent,
  students as studentsSelector
} from '../../../selectors'

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
      classData: data[props.classId],
      assignedLesson: (data[props.classId] || {}).assignedLesson || false,
      students: (data[props.classId] || {}).students || {}
    }),
    { rpc }
  ),
  firestoreConnect(({ assignedLesson, classData, students }) =>
    (assignedLesson
      ? Object.keys(students).map(student => ({
        collection: 'activities',
        where: [
          ['student', '==', student],
          ['lesson', '==', assignedLesson.id]
        ],
        storeAs: `lessonProgress-${assignedLesson.id}-${student}`
      }))
      : []
    ).concat(
      Object.keys(students).map(student => ({
        collection: 'users',
        doc: student,
        storeAs: student
      }))
    )
  ),
  connect((state, { assignedLesson, students }) => ({
    progressByStudent: assignedLesson
      ? progressByStudent(state, assignedLesson.id, students)
      : [],
    studentData: studentsSelector(state, students)
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
    },
    onAssign: props => lesson => e => {
      Modal.confirm({
        title: `Assign "${lesson.displayName}"`,
        content: `Are you sure want to assign "${
          lesson.displayName
        }" to your class?`,
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('class.assignLesson', {
              class: props.classId,
              lesson
            })
            message.success('Lesson assigned')
          } catch (e) {
            message.error(e.message)
          }
        }
      })
    }
  }),
  waitFor(props => [
    'classData',
    'assignedLesson',
    'studentData',
    'progressByStudent'
  ])
)
