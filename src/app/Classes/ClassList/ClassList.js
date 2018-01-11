// import PropTypes from 'prop-types'
import { Menu, Button, Icon, Avatar, Row, Col, Dropdown } from 'antd'
import React, { Component } from 'react'
import './ClassList.less'
import ClassModal from '../ClassModal'

class ClassList extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }
  render () {
    return (
      <span>
        <Menu
          mode='inline'
          style={{
            minHeight: 'calc(100vh - 62px)'
          }}>
          <Menu.Item style={{ padding: 0 }}>
            <UserDropdown />
          </Menu.Item>
          <Menu.Divider />
          {classes.map(i => <Menu.Item key={i}>{i}</Menu.Item>)}
          <Menu.Divider />
          <Menu.Item style={{ padding: '12px 24px' }}>
            <Button style={{ width: '100%' }} onClick={this.showModal}>
              <Icon type='plus' />New Class
            </Button>
          </Menu.Item>
        </Menu>
        <ClassModal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal} />
      </span>
    )
  }
}

const userMenu = (
  <Menu style={{ margin: '0 10px', border: '1px solid rgba(0,0,0,.05)' }}>
    <Menu.Item>Test</Menu.Item>
    <Menu.Item>Test 2</Menu.Item>
  </Menu>
)

const UserDropdown = props => (
  <Dropdown overlay={userMenu} trigger={['click']} placement='bottomCenter'>
    <Row
      type='flex'
      align='middle'
      justify='stretch'
      style={{
        cursor: 'pointer',
        height: 'auto',
        lineHeight: '20px',
        padding: '15px 16px'
      }}>
      <Col span={6}>
        <Avatar
          inline='true'
          size='large'
          style={{
            background: '#faad14',
            verticalAlign: 'middle'
          }}>
          S
        </Avatar>
      </Col>
      <Col span={18} className='ellipsis' style={{ paddingRight: 20 }}>
        <b>Selma Middle School</b>
        <br />
        <i>Teacher</i>
        <Icon type='down' style={{ position: 'absolute', right: 0 }} />
      </Col>
    </Row>
  </Dropdown>
)

ClassList.propTypes = {}

export default ClassList

const classes = [
  'American History P1',
  'American History P2',
  'English Literature P4',
  'English Literature P5'
]
