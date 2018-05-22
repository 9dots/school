import { progressByStudent, students as studentsSelector } from 'selectors'
import { compose, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { message, Modal } from 'antd'
import mapValues from '@f/map-values'
import getProp from '@f/get-prop'
import { rpc } from 'app/actions'

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
      classData: { id: classId, ...data[classId] },
      assignedLesson: (data[classId] || {}).assignedLesson || false,
      students: (data[classId] || {}).students || {},
      auth
    }),
    { rpc }
  ),
  firestoreConnect(({ assignedLesson, classData, students }) =>
    (assignedLesson
      ? assignedLesson.tasks.map(task => ({
        collection: 'activities',
        where: [
          ['module', '==', assignedLesson.module],
          ['task', '==', task.id]
        ],
        storeAs: assignedLesson.module + '-' + task.id
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
    progressByStudent: getProgress(assignedLesson, state, students),
    activeByTask: getActive(assignedLesson, state, students),
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
    assignToStudent: props => (lesson, module) => async e => {
      try {
        await props.rpc('user.assignLesson', {
          class: props.classId,
          teachers: props.classData.teachers,
          module,
          lesson
        })
      } catch (e) {
        message.error(e.message)
      }
    },
    onAssign: props => (lesson, module) => e => {
      Modal.confirm({
        title: `Assign "${lesson.displayName}"?`,
        content:
          'The lesson will immediately be assigned to your class. Any currently assigned lesson will be unassigned',
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('class.assignLesson', {
              class: props.classId,
              lesson: lesson.id,
              module
            })
            message.success('Lesson assigned')
          } catch (e) {
            message.error(e.message)
          }
        }
      })
    }
  }),
  waitFor(['classData', 'assignedLesson', 'progressByStudent'])
)

function getActive (assignedLesson, state, students) {
  const studentProgress = getProgress(assignedLesson, state, students)
  if (assignedLesson) {
    return assignedLesson.tasks.map(({ id }) =>
      mapValues(
        (val, key) => isActive(val, id) && val.student,
        studentProgress || {}
      ).filter(student => student)
    )
  }
}

function getProgress (assignedLesson, state, students) {
  return progressByStudent(state, assignedLesson, students)
}

function isActive (prog, lessonId) {
  return (getProp('progress', prog) || []).some(
    p => p.active && p.task === lessonId
  )
}
