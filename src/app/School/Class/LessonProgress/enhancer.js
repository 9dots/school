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
    data: mapValues(({ progress = [], student, ...rest }, key) => {
      const prog =
        props.active === 'all'
          ? {
            ...(progress[0] || {}),
            progress: progressPercent(progress)
          }
          : (progress || []).find(({ id }) => id === props.active)

      return {
        studentData: { id: key, ...student },
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
      if (this.props.task) {
        this.props.getTeacherView(this.props.task)
      } else {
        this.props.setTeacherView(null)
      }
    },
    componentWillUpdate (nextProps) {
      if (this.props.task !== nextProps.task) {
        if (nextProps.task) {
          this.props.getTeacherView(nextProps.task)
        } else {
          this.props.setTeacherView(null)
        }
      }
    }
  }),
  waitFor(['teacherView'])
)
