import { compose, withState, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import { setUrl, rpc } from 'app/actions'
import { setArrayImmutable } from 'utils'
import { draft, course } from 'selectors'
import waitFor from 'components/waitFor'
import deepEqual from '@f/deep-equal'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import splice from '@f/splice'
import omit from '@f/omit'

export default compose(
  modalContainer,
  connect(
    (state, { match }) => ({
      courseId: match.params.courseId
    }),
    { setUrl, rpc }
  ),
  withState('editKey', 'setEditKey', null),
  withState('mode', 'setMode', 'edit'),
  withState('orderedLessons', 'setOrderedLessons', []),
  withState('publishing', 'setPublishing', false),
  withState('isDirty', 'setDirty', false),
  firestoreConnect(props => [
    {
      collection: 'courses',
      doc: props.courseId,
      subcollections: [{ collection: 'drafts' }]
    },
    {
      collection: 'courses',
      doc: props.courseId,
      storeAs: props.courseId
    }
  ]),
  connect((state, props) => {
    const drafts = draft(state, props.courseId)
    const draftKey = Object.keys(drafts || {})[0]
    return {
      draft: draftKey,
      originalCourse: course(state, props.courseId),
      course:
        typeof drafts === 'undefined'
          ? undefined
          : (drafts || {})[draftKey] || undefined
    }
  }),
  waitFor(['course', 'originalCourse']),
  withHandlers({
    sendReorder: props => async data => {
      try {
        await props.rpc('course.reorder', {
          course: props.courseId,
          draft: props.draft,
          ...data
        })
      } catch (e) {
        message.error(e.message || e)
      }
    }
  }),
  withHandlers({
    publish: props => async data => {
      try {
        props.setPublishing(true)
        await props.rpc('course.publish', {
          course: props.courseId,
          draft: props.draft
        })
        props.setDirty(false)
        message.success('Course saved')
      } catch (e) {
        message.error((e.errorDetails || [{}])[0].message || e.error)
      }
      props.setPublishing(false)
    },
    deleteLesson: props => lesson => {
      Modal.confirm({
        title: `Remove "${lesson.displayName}"?`,
        content: 'Lesson will be removed from this lesson.',
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('course.removeLesson', {
              course: props.courseId,
              draft: props.draft,
              lesson: lesson.id
            })
            message.success(`"${lesson.displayName}" removed`)
          } catch (e) {
            message.error(e.error)
          }
        }
      })
    },
    onDrop: ({ orderedLessons, setOrderedLessons, sendReorder }) => e => {
      const { reason, destination, source, draggableId, type } = e
      if (reason === 'DROP' && destination) {
        sendReorder({
          source,
          type,
          destination,
          id: draggableId
        })
        if (type === 'lesson') {
          const ordered = reorder(
            orderedLessons,
            source.index,
            destination.index
          )
          return setOrderedLessons(ordered)
        }
        return setOrderedLessons(
          handleDrop(orderedLessons, source, destination, draggableId)
        )
      }
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.rpc('course.createDraft', {
        course: this.props.courseId
      })
      if (this.props.course) {
        this.props.setOrderedLessons(this.props.course.lessons)
      }
    },
    componentWillUnmount () {
      this.props.setDirty(false)
      this.props.rpc('course.createDraft', {
        course: this.props.courseId
      })
    },
    componentWillUpdate (nextProps) {
      if (!this.props.isLoaded && nextProps.isLoaded) {
        if (nextProps.course) {
          this.props.setOrderedLessons(nextProps.course.lessons)
        }
      }
      if (this.props.isLoaded) {
        if (
          nextProps.course &&
          !deepEqual(this.props.course, nextProps.course)
        ) {
          this.props.setOrderedLessons(nextProps.course.lessons)
        }
        if (
          this.props.isLoaded &&
          nextProps.course &&
          !nextProps.isDirty &&
          isDirtyCourse(nextProps.originalCourse, nextProps.course)
        ) {
          window.onbeforeunload = function (e) {
            return true
          }
          this.props.setDirty(true)
        }
        if (
          nextProps.course &&
          this.props.isDirty &&
          !isDirtyCourse(nextProps.originalCourse, nextProps.course)
        ) {
          window.onbeforeunload = null
          this.props.setDirty(false)
        }
      }
    }
  })
)

function isDirtyCourse (originalCourse, course) {
  return !deepEqual(
    omit('published', originalCourse),
    omit('published', course)
  )
}

function handleDrop (arr, source, destination, id) {
  const next = arr.find(item => item.id === destination.droppableId)
  const prev = arr.find(item => item.id === source.droppableId)
  if (source.droppableId === destination.droppableId) {
    return setArrayImmutable(arr, arr.indexOf(next), {
      ...next,
      tasks: reorder(next.tasks, source.index, destination.index)
    })
  }
  const target = prev.tasks.find(t => t.id === id)
  return arr.map(lesson => {
    if (lesson.id === destination.droppableId) {
      return {
        ...lesson,
        tasks: splice(lesson.tasks, destination.index, 0, target)
      }
    } else if (lesson.id === source.droppableId) {
      return {
        ...lesson,
        tasks: splice(lesson.tasks, source.index, 1)
      }
    }
    return lesson
  })
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
