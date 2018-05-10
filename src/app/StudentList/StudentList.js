import { Button, Menu, Icon, Divider, Row, Col } from 'antd'
import waitFor from 'components/waitFor'
import StudentItem from './StudentItem'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import React from 'react'

import './StudentList.less'

const enhancer = compose(waitFor(['studentData']))

const StudentList = props => {
  const { progressByStudent, students, isLoaded, modal, tasks } = props
  if (!isLoaded) return <Loading />
  return (
    <div>
      <Row
        type='flex'
        style={{
          padding: '10px 16px',
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
        <Col className='flex-grow'>Students</Col>
        <Col>
          <Icon
            style={{ cursor: 'pointer' }}
            type='setting'
            onClick={modal.showModal({
              name: 'classSettingsModal',
              tab: 'students'
            })} />
        </Col>
      </Row>
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
          onClick={modal.showModal({
            name: 'createStudent',
            school: props.school,
            class: props.class,
            onOk: modal.hideModal('createStudent'),
            onCancel: modal.hideModal('createStudent')
          })}>
          <Icon type='plus' />Add Student
        </Button>
      </div>
    </div>
  )
}

StudentList.propTypes = {}

export default enhancer(StudentList)
