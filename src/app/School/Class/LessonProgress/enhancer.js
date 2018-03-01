import { compose, withHandlers, withState } from 'recompose'

export default compose(
  withState('active', 'setTask', ({ active }) => active),
  withHandlers({
    setTask: props => ({ key }) => {
      props.setTask(key)
    }
  })
)
