import PropTypes from 'prop-types'
import { Modal, Form, Input, AutoComplete } from 'antd'
import React from 'react'
import './ClassModal.less'

const data = ['1', '2', '3', '4', '5']

const ClassModal = props => {
  return (
    <Modal {...props} title='Donkey'>
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

ClassModal.propTypes = {}

export default ClassModal
