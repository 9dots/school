import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, Form, Input, Row, Col, AutoComplete } from 'antd'
import './Onboarding.less'

class Onboarding extends Component {
  render () {
    return (
      <div>
        <Modal
          title={'Complete Your Profile!'}
          visible={true}
          maskClosable={false}
          closable={false}>
          <Form>
            <Item {...itemLayout} label='Full Name'>
              <Row gutter={8}>
                <Col span={12}>
                  <Input placeholder='Mabel' />
                </Col>
                <Col span={12}>
                  <Input placeholder='Royster' />
                </Col>
              </Row>
            </Item>
            <Item label='Displayed Name'>
              <Input placeholder='Mrs. Royster' />
            </Item>
            <Item label='School'>
              <AutoComplete placeholder='type school name' />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 }
  }
}

const Item = props => <Form.Item {...itemLayout} {...props} />

Onboarding.propTypes = {}

export default Onboarding
