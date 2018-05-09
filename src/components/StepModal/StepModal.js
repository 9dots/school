import PropTypes from 'prop-types'
import { stopEvent } from 'utils'
import { Modal } from 'antd'
import React from 'react'
import { compose, withStateHandlers } from 'recompose'

import './StepModal.less'

const enhancer = compose(
  withStateHandlers(() => ({ openModal: 0 }), {
    next: ({ openModal }, { modals = [] }) => () => ({
      openModal: wrap(++openModal, 0, modals.length - 1)
    }),
    prev: ({ openModal }, { modals = [] }) => () => ({
      openModal: wrap(--openModal, 0, modals.length - 1)
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
    <span onClick={stopEvent(() => {})}>
      <Modal
        visible
        maskStyle={maskStyle}
        maskClosable={maskClosable}
        className='step-modal'>
        <Component
          {...props}
          key={openModal}
          stepModal={{ next, prev, goTo }}
          mask={false} />
      </Modal>
    </span>
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
