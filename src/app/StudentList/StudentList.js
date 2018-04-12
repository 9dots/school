import waitFor from '../../components/waitFor/waitFor'
import CreateStudentModal from './CreateStudentModal'
import { Button, Menu, Icon, Divider } from 'antd'
import StudentItem from './StudentItem'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import React from 'react'

import './StudentList.less'

const enhancer = compose(waitFor(['studentData']))

const StudentList = props => {
  const {
    addStudentSuccess,
    progressByStudent,
    students,
    isLoaded,
    modal,
    tasks
  } = props
  if (!isLoaded) return <Loading />
  return (
    <div
      style={{
        minHeight: 'calc(100vh - 62px)',
        borderLeft: '1px solid #e8e8e8'
      }}>
      <div
        style={{
          padding: '10px 16px',
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
        Students
      </div>
      <Menu
        mode='vertical-right'
        selectedKeys={[]}
        fluid
        style={{ borderLeft: 'none' }}>
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
      </Menu>
      {!!students.length && <Divider style={{ margin: 0 }} />}
      <div style={{ padding: '12px 24px' }}>
        <Button
          style={{ width: '100%' }}
          onClick={modal.showModal('createStudent')}>
          <Icon type='plus' />Add Student
        </Button>
      </div>
      {modal.isVisible('createStudent') && (
        <CreateStudentModal
          onCancel={modal.hideModal('createStudent')}
          onOk={addStudentSuccess}
          school={props.school}
          class={props.class}
          visible
          {...modal.getProps('createStudent')} />
      )}
    </div>
  )
}

StudentList.propTypes = {}

export default enhancer(StudentList)
