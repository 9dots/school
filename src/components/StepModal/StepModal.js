import PropTypes from 'prop-types'
import { stopEvent } from 'utils'
import { Modal } from 'antd'
import React from 'react'
import { compose, withStateHandlers } from 'recompose'

import './StepModal.less'

const enhancer = compose(
  withStateHandlers(() => ({ openModal: 0 }), {
    next: ({ openModal }, { modals = [] }) => () => ({
      openModal: openModal >= modals.length - 1 ? 0 : ++openModal
    }),
    prev: ({ openModal }, { modals = [] }) => () => ({
      openModal: openModal <= 0 ? modals.length - 1 : --openModal
    })
  })
)

const StepModal = ({
  maskClosable,
  maskStyle,
  openModal,
  modals,
  next,
  prev,
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
        <Component {...props} stepModal={{ next, prev }} mask={false} />
      </Modal>
    </span>
  )
}

StepModal.propTypes = {}

export default enhancer(StepModal)
