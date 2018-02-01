import CreateStudentModal from './CreateStudentModal'
import { Button, Menu, Icon } from 'antd'
import StudentItem from './StudentItem'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentList.less'

const StudentList = props => {
  const { students, hideModal, showModal, addStudentSuccess } = props
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
            <StudentItem uid={uid} />
          </Menu.Item>
        ))}
        {!!students.length && <Menu.Divider />}
      </Menu>
      <div style={{ padding: '12px 24px' }}>
        <Button style={{ width: '100%' }} onClick={showModal('createStudent')}>
          <Icon type='plus' />Add Student
        </Button>
      </div>
      <CreateStudentModal
        onOk={addStudentSuccess}
        onCancel={hideModal('createStudent')}
        class={props.class}
        school={props.school}
        visible={props.isVisible('createStudent')} />
    </div>
  )
}

StudentList.propTypes = {}

export default StudentList
