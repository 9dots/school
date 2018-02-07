import PropTypes from 'prop-types'
import { Modal, Form } from 'antd'
import React from 'react'
import './AddCourseModal.less'

const AddCourseModal = props => {
  return (
    <Modal
      {...props}
      onCancel={() => props.onCancel(null)}
      title='Add a Course'>
      Tots
    </Modal>
  )
}

AddCourseModal.propTypes = {}

export default AddCourseModal
