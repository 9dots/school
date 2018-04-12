import { showModal, hideModal } from '../../ducks/modals'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import curry from 'curry'
import React from 'react'

import './modalContainer.less'

const enhancer = connect(({ modal }) => ({ modal }), { showModal, hideModal })

const modalContainer = Component => {
  return enhancer(
    class HOC extends React.PureComponent {
      showModal = curry((props, e) => {
        if (typeof props === 'string') {
          return this.props.showModal(props)
        } else if (typeof props === 'object') {
          const { name, ...restProps } = props
          if (!name) {
            throw new Error('Object must have a name property')
          }
          return this.props.showModal(name, restProps)
        }
        throw new Error('First argument must be a string or an object')
      })
      hideModal = curry((name, e) => this.props.hideModal(name))
      getModalProps = name => this.props.modal[name] || {}
      isVisible = name => !!this.props.modal[name]
      render () {
        return (
          <Component
            {...this.props}
            modal={{
              showModal: this.showModal,
              hideModal: this.hideModal,
              isVisible: this.isVisible,
              getProps: this.getModalProps
            }}
            getModalProps={this.getModalProps}
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
