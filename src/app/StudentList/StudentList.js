import { Button, Modal, Avatar, Menu, Icon } from 'antd'
import AddStudentModal from './AddStudentModal'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentList.less'

const StudentList = props => {
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        paddingTop: 20
      }}>
      <Menu mode='vertical-right' fluid>
        {[1, 2, 3, 4, 5].map(i => (
          <Menu.Item key={i} onClick={() => console.log(i)}>
            <Avatar
              size='small'
              style={{ marginRight: 10, textAlign: 'center' }}
              icon='user' />
            Student {i}
          </Menu.Item>
        ))}
      </Menu>
      <div style={{ padding: '12px 24px' }}>
        <Button style={{ width: '100%' }} onClick={props.showModal}>
          <Icon type='plus' />Add Student
        </Button>
      </div>
      <AddStudentModal
        onOk={props.hideModal}
        onCancel={props.hideModal}
        visible={props.modalVisible}>
        Party
      </AddStudentModal>
    </div>
  )
}

StudentList.propTypes = {}

const ModalContainer = Component => {
  return class HOC extends React.Component {
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
        <Component
          showModal={this.showModal.bind(this)}
          hideModal={this.hideModal.bind(this)}
          modalVisible={this.state.visible}
          {...this.props} />
      )
    }
  }
}

export default ModalContainer(StudentList)
