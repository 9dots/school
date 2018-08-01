import { compose, lifecycle } from 'recompose'

export default compose(
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (isComplete(this.props) !== isComplete(nextProps)) {
        this.setState({ becameComplete: isComplete(nextProps) })
      }
    }
  })
)

function isComplete ({ match, progress }) {
  const { taskNum } = match.params
  const cur = parseInt(taskNum, 10)
  return progress[cur].progress >= 100
}
