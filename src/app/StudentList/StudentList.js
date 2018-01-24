import ModalContainer from '../../components/ModalContainer'
import CreateStudentModal from './CreateStudentModal'
import { Button, Avatar, Menu, Icon } from 'antd'
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
      <CreateStudentModal
        onOk={props.hideModal}
        onCancel={props.hideModal}
        school={props.school}
        visible={props.modalVisible} />
    </div>
  )
}

StudentList.propTypes = {}

export default ModalContainer(StudentList)
