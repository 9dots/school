import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import './AddSuccessModal.less'

const AddSuccessModal = ({ classes = [], onOk, ...rest }) => {
  return (
    <Modal
      className='add-success-modal'
      title='Added Successfully 🎉'
      okText='Close'
      style={{ textAlign: 'center' }}
      {...rest}
      footer={
        <Button type='primary' onClick={onOk}>
          Close
        </Button>
      }>
      <h3>
        You assigned <b>&quot;Intro to Computers&quot;</b> to:
      </h3>
      <h3>
        {classes.map(({ displayName, id }, key) => (
          <Link onClick={onOk} to={'/class/' + id} key={key}>
            {displayName}
          </Link>
        ))}
      </h3>
      <h3>Go to your class page to get started!</h3>
    </Modal>
  )
}

AddSuccessModal.propTypes = {}

export default AddSuccessModal
