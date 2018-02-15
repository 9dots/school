import React from 'react'
import './waitFor.less'

function waitFor (props) {
  return Component => {
    return class HoC extends React.Component {
      render () {
        return (
          <Component
            isLoaded={getWaitForProps(props, this.props)
              .map(prop => checkProp(this.props[prop]))
              .every(p => p)}
            {...this.props} />
        )
      }
    }
  }
}

function checkProp (prop) {
  if (Array.isArray(prop)) {
    return prop.every(p => p !== undefined)
  }
  return prop !== undefined
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
