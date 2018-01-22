// import PropTypes from 'prop-types'
import { Menu, Button, Icon } from 'antd'
import React, { Component } from 'react'
import './ClassList.less'
import SchoolDropdown from '../SchoolDropdown'
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
    const { currentSchool } = this.props
    return (
      <div
        style={{
          minHeight: 'calc(100vh - 62px)',
          borderRight: '1px solid #e8e8e8'
        }}>
        <SchoolDropdown currentSchool={currentSchool} />
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

ClassList.propTypes = {}

export default ClassList

const classes = [
  'American History P1',
  'American History P2',
  'English Literature P4',
  'English Literature P5'
]
