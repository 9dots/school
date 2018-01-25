import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Form, Input, AutoComplete } from 'antd'
import './SchoolModal.less'

const data = ['1', '2', '3', '4', '5']

const SchoolModal = props => {
  return (
    <Modal {...props} title='Create A School'>
      <Form>
        <Form.Item>
          <AutoComplete dataSource={data} size='large' />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

SchoolModal.propTypes = {}

export default SchoolModal
