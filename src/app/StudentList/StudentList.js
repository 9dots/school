import CreateStudentModal from './CreateStudentModal'
import { Button, Menu, Icon } from 'antd'
import StudentItem from './StudentItem'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentList.less'

const StudentList = props => {
  const { students, hideModal, showModal, isVisible, addStudentSuccess } = props
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        borderLeft: '1px solid #e8e8e8',
        paddingTop: 20
      }}>
      <Menu mode='vertical-right' fluid style={{ borderLeft: 'none' }}>
        {students.map(uid => (
          <Menu.Item key={uid}>
            <StudentItem class={props.class} uid={uid} />
          </Menu.Item>
        ))}
        {!!students.length && <Menu.Divider />}
      </Menu>
      <div style={{ padding: '12px 24px' }}>
        <Button style={{ width: '100%' }} onClick={showModal('createStudent')}>
          <Icon type='plus' />Add Student
        </Button>
      </div>
      {isVisible('createStudent') && (
        <CreateStudentModal
          onCancel={hideModal('createStudent')}
          onOk={addStudentSuccess}
          school={props.school}
          class={props.class}
          visible />
      )}
    </div>
  )
}

StudentList.propTypes = {}

export default StudentList
