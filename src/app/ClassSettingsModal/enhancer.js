import { compose, withState, withHandlers } from 'recompose'

export default compose(
  withState('tab', 'setTab', ({ tab = 'details' }) => tab),
  withHandlers({
    setTab: props => ({ key }) => {
      props.setTab(key)
    }
  })
)
