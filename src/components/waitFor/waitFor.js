import React from 'react'
import './waitFor.less'

function waitFor (props) {
  return Component => {
    return class HoC extends React.PureComponent {
      render () {
        return (
          <Component
            isLoaded={getWaitForProps(props, this.props)
              .map(p => this.props[p] !== undefined)
              .every(p => p)}
            {...this.props} />
        )
      }
    }
  }
}

function getWaitForProps (config, props) {
  if (typeof config === 'function') {
    return config(props)
  } else if (Array.isArray(config)) {
    return config
  }
  throw new Error('config must be an array or function')
}

export default waitFor
