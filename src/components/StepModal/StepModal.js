import PropTypes from 'prop-types'
import { Modal } from 'antd'
import React from 'react'
import { compose, withStateHandlers } from 'recompose'

import './StepModal.less'

const enhancer = compose(
  withStateHandlers(() => ({ openModal: 0 }), {
    next: ({ openModal }, { modals = [] }) => props => ({
      openModal: wrap(++openModal, 0, modals.length - 1),
      ...props
    }),
    prev: ({ openModal }, { modals = [] }) => props => ({
      openModal: wrap(--openModal, 0, modals.length - 1),
      ...props
    }),
    goTo: () => i => ({ openModal: i })
  })
)

const StepModal = ({
  maskClosable,
  maskStyle,
  openModal,
  modals,
  next,
  prev,
  goTo,
  ...rest
}) => {
  const modal = modals[openModal]
  const isObj = typeof modal === 'object'
  const Component = isObj ? modal.modal : modal
  const props = isObj ? { ...rest, ...modal.props } : rest

  return (
    <Modal
      visible
      maskStyle={maskStyle}
      maskClosable={maskClosable}
      className='step-modal'>
      <Component
        {...props}
        stepModal={{ next, prev, goTo }}
        key={'modal-' + openModal}
        mask={false}
        visible />
    </Modal>
  )
}

StepModal.propTypes = {}

export default enhancer(StepModal)

function clamp (val, min, max) {
  return Math.min(Math.max(val, min), max)
}

function wrap (val, min, max) {
  if (val < min) return max
  if (val > max) return min
  return val
}
