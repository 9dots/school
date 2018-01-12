import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Form, Input, AutoComplete, Steps } from 'antd'
import Header from '../Header'
import './Onboarding.less'

const Onboarding = props => {
  return (
    <div>
      <Header />
      <Modal
        title={<Title />}
        visible={true}
        maskClosable={false}
        closable={false}>
        <Form>
          <Form.Item label='Full Name'>
            <Input placeholder='Mabel Royster' />
          </Form.Item>
          <Form.Item label='Displayed Name'>
            <Input placeholder='Mrs. Royster' />
          </Form.Item>
          <Form.Item label='Username'>
            <Input placeholder='mrsroyster' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const Title = props => (
  <Steps size='small' current={0}>
    <Steps.Step title='Name' />
    <Steps.Step title='School' />
    <Steps.Step title='Confirm' />
  </Steps>
)

Onboarding.propTypes = {}

export default Onboarding
