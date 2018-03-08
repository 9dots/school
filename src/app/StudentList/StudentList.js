import waitFor from '../../components/waitFor/waitFor'
import CreateStudentModal from './CreateStudentModal'
import { Button, Menu, Icon } from 'antd'
import StudentItem from './StudentItem'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import React from 'react'

import './StudentList.less'

const enhancer = compose(waitFor(['studentData']))

const StudentList = props => {
  const {
    students,
    hideModal,
    showModal,
    isVisible,
    addStudentSuccess,
    isLoaded,
    progressByStudent,
    tasks
  } = props
  if (!isLoaded) return <Loading />
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        borderLeft: '1px solid #e8e8e8',
        paddingTop: 20
      }}>
      <Menu mode='vertical-right' fluid style={{ borderLeft: 'none' }}>
        {students.map(uid => (
          <Menu.Item
            key={uid}
            style={{ borderTop: '1px solid #e8e8e8', margin: 0 }}>
            <StudentItem
              tasks={tasks}
              studentProgress={progressByStudent[uid] || {}}
              class={props.class}
              uid={uid} />
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

export default enhancer(StudentList)
