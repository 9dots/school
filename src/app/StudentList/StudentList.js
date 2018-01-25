import ModalContainer from '../../components/ModalContainer'
import CreateStudentModal from './CreateStudentModal'
import { Button, Menu, Icon } from 'antd'
import StudentItem from './StudentItem'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentList.less'

const StudentList = props => {
  const { students } = props
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        paddingTop: 20
      }}>
      <Menu mode='vertical-right' fluid>
        {students.map(uid => (
          <Menu.Item key={uid} onClick={() => console.log(uid)}>
            <StudentItem uid={uid} />
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
        class={props.class}
        school={props.school}
        visible={props.modalVisible} />
    </div>
  )
}

StudentList.propTypes = {}

export default ModalContainer(StudentList)
