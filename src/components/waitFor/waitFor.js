import React from 'react'
import './waitFor.less'

function waitFor (props) {
  return Component => {
    return class HoC extends React.PureComponent {
      render () {
        return (
          <Component
            isLoaded={props.map(p => this.props[p] !== undefined).every(p => p)}
            {...this.props} />
        )
      }
    }
  }
}

export default waitFor
