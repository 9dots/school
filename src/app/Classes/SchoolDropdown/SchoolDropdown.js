import { Menu, Icon, Avatar, Row, Col, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SchoolModal from '../SchoolModal'
import './SchoolDropdown.less'

const schools = [
  'Rivera Middle School',
  'Bancroft Middle School',
  'Corona Del Mar High School',
  'Hillside Middle School'
]

class SchoolDropdown extends Component {
  state = { visible: false }
  menuClick = ({ key }) => {
    switch (key) {
      case 'newSchool':
        this.showModal()
        break
      default:
        console.log(key)
        break
    }
  }
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
    const schoolMenu = (
      <Menu className='school-menu' onClick={this.menuClick}>
        <Menu.Item className='no-pointer'>
          <b>My Schools </b>
        </Menu.Item>
        <Menu.Divider />
        {schools.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
        <Menu.Divider />
        <Menu.Item key='newSchool'>
          <Icon type='plus' style={{ marginRight: 10 }} /> New School
        </Menu.Item>
      </Menu>
    )

    return (
      <span>
        <Dropdown
          overlay={schoolMenu}
          trigger={['click']}
          placement='bottomCenter'>
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
        <SchoolModal
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal} />
      </span>
    )
  }
}

SchoolDropdown.propTypes = {}

export default SchoolDropdown
