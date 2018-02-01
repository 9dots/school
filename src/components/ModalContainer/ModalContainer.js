import { showModal, hideModal } from '../../ducks/modals'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import curry from 'curry'
import React from 'react'

import './modalContainer.less'

const enhancer = connect(({ modal }) => ({ modal }), { showModal, hideModal })

const modalContainer = Component => {
  return enhancer(
    class HOC extends React.Component {
      showModal = curry((name, e) => this.props.showModal(name))
      hideModal = curry((name, e) => this.props.hideModal(name))
      isVisible = name => this.props.modal[name] || false
      render () {
        return (
          <Component
            {...this.props}
            showModal={this.showModal}
            hideModal={this.hideModal}
            isVisible={this.isVisible} />
        )
      }
    }
  )
}

modalContainer.propTypes = {}

export default modalContainer
