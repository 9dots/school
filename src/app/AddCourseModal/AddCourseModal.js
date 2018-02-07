import PropTypes from 'prop-types'
import { Modal, Form, Checkbox } from 'antd'
import React from 'react'
import './AddCourseModal.less'

const AddCourseModal = props => {
  return (
    <Modal
      {...props}
      onCancel={() => props.onCancel(null)}
      title='Add a Course'>
      <Form>
        {[1, 2, 3, 4].map((key, val) => (
          <div key={key}>
            <Checkbox>{val}</Checkbox>
          </div>
        ))}
      </Form>
    </Modal>
  )
}

AddCourseModal.propTypes = {}

export default AddCourseModal
