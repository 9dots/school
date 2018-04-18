import { compose, withState, lifecycle, withHandlers } from 'recompose'
import { firestoreConnect } from 'react-redux-firebase'
import modalContainer from 'components/modalContainer'
import waitFor from '../../components/waitFor'
import { setUrl, rpc } from 'app/actions'
import { setArrayImmutable } from 'utils'
import { course } from '../../selectors'
import deepEqual from '@f/deep-equal'
import { connect } from 'react-redux'
import splice from '@f/splice'
import { message } from 'antd'

export default compose(
  modalContainer,
  connect(
    (
      state,
      {
        match: {
          params: { courseId }
        }
      }
    ) => ({
      courseId
    }),
    { setUrl, rpc }
  ),
  withState('editKey', 'setEditKey', null),
  withState('mode', 'setMode', 'edit'),
  withState('orderedLessons', 'setOrderedLessons', []),
  withHandlers({
    sendReorder: props => async data => {
      try {
        await props.rpc('course.reorder', {
          course: props.courseId,
          ...data
        })
      } catch (e) {
        message.error(e.message || e)
      }
    },
    publish: props => async data => {
      try {
        await props.rpc('course.publish', {
          course: props.courseId
        })
      } catch (e) {
        message.error(e.error)
      }
    }
  }),
  withHandlers({
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
  firestoreConnect(props => [
    {
      collection: 'courses',
      doc: props.courseId,
      storeAs: props.courseId
    }
  ]),
  connect((state, props) => ({ course: course(state, props.courseId) })),
  waitFor(['course']),
  lifecycle({
    componentDidMount () {
      if (this.props.course) {
        this.props.setOrderedLessons(this.props.course.lessons)
      }
    },
    componentWillUpdate (nextProps) {
      if (!this.props.isLoaded && nextProps.isLoaded) {
        this.props.setOrderedLessons(nextProps.course.lessons)
      }
      if (
        this.props.isLoaded &&
        !deepEqual(this.props.course, nextProps.course)
      ) {
        this.props.setOrderedLessons(nextProps.course.lessons)
      }
    }
  })
)

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
