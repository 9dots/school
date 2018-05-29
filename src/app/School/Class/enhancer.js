import { progressByStudent, students as studentsSelector } from 'selectors'
import { withHandlers, lifecycle, compose, branch } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { message, Modal } from 'antd'
import mapValues from '@f/map-values'
import getProp from '@f/get-prop'
import { rpc } from 'app/actions'

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
      classData: { id: classId, ...data[classId] },
      students: (data[classId] || {}).students || {},
      auth
    }),
    { rpc }
  ),
  branch(props => props.classLesson, progressData),
  connect(({ firestore: { data } }, props) => ({
    assignedLesson: getAssignedLesson(data, props) || null
  })),
  firestoreConnect(({ assignedLesson, classLesson, classData, students }) =>
    (assignedLesson
      ? assignedLesson.tasks.map(task => ({
        collection: 'activities',
        where: [
          ['module', '==', classLesson.module],
          ['task', '==', task.id]
        ],
        storeAs: classLesson.module + '-' + task.id
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
  connect((state, { assignedLesson, students, classLesson }) => ({
    progressByStudent: getProgress(
      assignedLesson,
      state,
      students,
      classLesson.module
    ),
    activeByTask: getActive(
      assignedLesson,
      state,
      students,
      classLesson.module
    ),
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

function getActive (assignedLesson, state, students, mod) {
  const studentProgress = getProgress(assignedLesson, state, students, mod)
  if (assignedLesson) {
    return assignedLesson.tasks.map(({ id }) =>
      mapValues(
        (val, key) => isActive(val, id) && val.student,
        studentProgress || {}
      ).filter(student => student)
    )
  }
}

function getProgress (assignedLesson, state, students, mod) {
  return progressByStudent(state, assignedLesson, students, mod)
}

function isActive (prog, lessonId) {
  return (getProp('progress', prog) || []).some(
    p => p.active && p.task === lessonId
  )
}

function getAssignedLesson (data, props) {
  const lesson = props.classLesson.id
  const lessons = (data[props.classLesson.module] || {}).lessons || []
  const assigned = lessons.find(l => l.id === lesson)

  return assigned ? { ...assigned, module: props.classLesson.module } : null
}
