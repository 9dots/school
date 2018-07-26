import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { message, Modal } from 'antd'
import Loading from 'app/Loading'
import { rpc } from 'app/actions'
import {
  withHandlers,
  renderComponent,
  lifecycle,
  compose,
  branch
} from 'recompose'

const progressData = firestoreConnect(props => [
  {
    collection: 'modules',
    doc: props.classLesson.module,
    storeAs: props.classLesson.module
  }
])

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
    ({ firestore: { data }, firebase: { auth } }, { classId }) => ({
      classLesson: (data[classId] || {}).assignedLesson || false,
      classData: data[classId] ? { id: classId, ...data[classId] } : undefined,
      students: (data[classId] || {}).students || {},
      auth
    }),
    { rpc }
  ),
  branch(props => !props.classData, renderComponent(Loading), progressData),
  connect(({ firestore: { data } }, props) => ({
    assignedLesson: getAssignedLesson(data, props)
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
    onAssign: props => (lesson, module, opts = {}) => e => {
      const { student } = opts
      if (student) {
        return onOk()
      }
      Modal.confirm({
        title: `Assign "${lesson.displayName}"?`,
        content:
          'The lesson will immediately be assigned to your class. Any currently assigned lesson will be unassigned.',
        okText: 'Yes',
        cancelText: 'No',
        onOk
      })

      async function onOk () {
        try {
          await props.rpc('class.assignLesson', {
            class: props.classId,
            lesson: lesson.id,
            student: student ? props.auth.uid : undefined,
            module
          })
          if (!student) message.success('Lesson assigned')
        } catch (e) {
          message.error(e.message)
        }
      }
    }
  }),
  waitFor(['assignedLesson', 'auth', 'classData'])
)

function getAssignedLesson (data, props) {
  const lesson = props.classLesson.id
  if (!lesson) return null
  if (!data[props.classLesson.module]) return undefined
  const lessons = (data[props.classLesson.module] || {}).lessons || []
  const assigned = lessons.find(l => l.id === lesson)

  return assigned ? { ...assigned, module: props.classLesson.module } : null
}
