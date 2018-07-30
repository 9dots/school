import waitFor from 'components/waitFor'
import { progressPercent } from 'utils'
import mapValues from '@f/map-values'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'
import {
  compose,
  withHandlers,
  withState,
  withProps,
  lifecycle,
  withStateHandlers
} from 'recompose'

export default compose(
  connect(
    null,
    { rpc }
  ),
  withState('active', 'setTask', ({ active }) => active),
  withStateHandlers(
    { teacherView: undefined },
    { setTeacherView: () => teacherView => ({ teacherView }) }
  ),
  withProps(props => ({
    task: (props.lesson.tasks || []).find(({ id }) => id === props.active),
    data: mapValues(({ progress, student }, key) => {
      const prog =
        props.active === 'all'
          ? allProgress(progress)
          : (progress || []).find(p => p.task === props.active)

      return {
        studentData: student,
        ...prog
      }
    }, props.studentProgress)
  })),
  withHandlers({
    setTask: props => ({ key }) => {
      props.setTask(key)
    },
    getTeacherView: props => async task => {
      const res = await props.rpc('module.getTaskTeacherView', {
        task
      })
      if (res.ok) {
        props.setTeacherView(res.teacherView)
      }
    }
  }),
  lifecycle({
    componentWillMount () {
      this.props.getTeacherView(this.props.task)
    },
    componentWillUpdate (nextProps) {
      if (this.props.task !== nextProps.task) {
        this.props.getTeacherView(nextProps.task)
      }
    }
  }),
  waitFor(['teacherView'])
)

function allProgress (progress = []) {
  return {
    progress: progressPercent(progress)
  }
}
