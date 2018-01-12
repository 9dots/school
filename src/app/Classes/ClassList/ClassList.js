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
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}>
        <SchoolDropdown />
        <Menu mode='inline' style={{ borderRight: 0 }}>
          <Menu.Divider />
          {classes.map(i => <Menu.Item key={i}>{i}</Menu.Item>)}
          <Menu.Divider />
        </Menu>
        <div style={{ padding: '12px 24px' }}>
          <Button style={{ width: '100%' }} onClick={this.showModal}>
            <Icon type='plus' />New Class
          </Button>
        </div>
        <ClassModal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal} />
      </div>
    )
  }
}

const schoolMenu = (
  <Menu className='school-menu'>
    <Menu.Item className='no-pointer'>
      <b>My Schools </b>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>Rivera Middle School</Menu.Item>
    <Menu.Item>Bancroft Middle School</Menu.Item>
    <Menu.Item>Corona Del Mar High School</Menu.Item>
    <Menu.Item>Hillside Middle School</Menu.Item>
    <Menu.Item>
      <Icon type='plus' />New{' '}
    </Menu.Item>
  </Menu>
)

const SchoolDropdown = props => (
  <Dropdown overlay={schoolMenu} trigger={['click']} placement='bottomCenter'>
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
