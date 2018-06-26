import { compose, lifecycle, withStateHandlers } from 'recompose'

export default compose(
  withStateHandlers(
    { windowWidth: window.innerWidth },
    {
      setWidth: () => e => ({
        windowWidth: e.target.innerWidth
      })
    }
  ),

  lifecycle({
    componentDidMount () {
      const _listener = this.props.setWidth
      window.addEventListener('resize', _listener)
    },

    componentWillUnmount () {
      const _listener = this.props.setWidth
      window.removeEventListener('resize', _listener)
    }
  })
)
