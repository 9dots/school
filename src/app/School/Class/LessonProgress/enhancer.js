import { compose, withHandlers, withState, withProps } from 'recompose'
import mapValues from '@f/map-values'

export default compose(
  withState('active', 'setTask', ({ active }) => active),
  withProps(props => ({
    task: (props.lesson.tasks || []).find(({ id }) => id === props.active),
    data: mapValues(({ progress, student }, key) => {
      const prog =
        props.active === 'all'
          ? allProgress(progress)
          : (progress || []).find(p => p.activity === props.active)

      return {
        studentData: student,
        ...prog
      }
    }, props.studentProgress)
  })),
  withHandlers({
    setTask: props => ({ key }) => {
      props.setTask(key)
    }
  })
)

function allProgress (progress = []) {
  return {
    ...progress[0],
    progress:
      Math.round(
        progress.reduce((acc, p) => acc + p.progress, 0) / progress.length
      ) || 0
  }
}
