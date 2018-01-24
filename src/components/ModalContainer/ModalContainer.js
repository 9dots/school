import PropTypes from 'prop-types'
import React from 'react'

import './ModalContainer.less'

const ModalContainer = Component => {
  return class HOC extends React.Component {
    state = { visible: false }
    showModal = () => {
      this.setState({
        visible: true
      })
    }
    hideModal = () => {
      this.setState({
        visible: false
      })
    }
    render () {
      return (
        <Component
          showModal={this.showModal.bind(this)}
          hideModal={this.hideModal.bind(this)}
          modalVisible={this.state.visible}
          {...this.props} />
      )
    }
  }
}

ModalContainer.propTypes = {}

export default ModalContainer
