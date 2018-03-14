import { compose, withHandlers, withProps } from 'recompose'
import { stopEvent } from '../../../utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { rpc } from '../../actions'
import { Link } from 'react-router-dom'
import React from 'react'
import {
  Progress,
  Avatar,
  Dropdown,
  Popover,
  message,
  Button,
  Modal,
  Menu,
  Row,
  Col
} from 'antd'
import './StudentItem.less'

const confirm = Modal.confirm

const enhancer = compose(
  connect(({ firestore: { data } }, props) => ({ student: data[props.uid] }), {
    rpc
  }),
  withProps(props => ({
    progress: (props.studentProgress.progress || []).reduce(
      (acc, p) => ({
        ...acc,
        [p.activity]: p.progress
      }),
      {}
    )
  })),
  withHandlers({
    deleteStudent: ({
      rpc,
      class: { id, displayName },
      uid,
      student
    }) => () => {
      confirm({
        title: 'Remove Student',
        content: `Are you sure want to remove ${
          student.displayName
        } from ${displayName}?`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk () {
          try {
            await rpc('class.removeStudent', {
              student: uid,
              class: id
            })
            message.success('Student removed')
          } catch (e) {
            message.error(e)
          }
        }
      })
    }
  })
)

const StudentItem = ({
  studentProgress = {},
  deleteStudent,
  tasks = [],
  uid
}) => {
  const { student, progress = [] } = studentProgress
  const { displayName } = student

  const width = {
    width: 210,
    maxWidth: 210
  }

  const idx = progress.findIndex((p, i) => p.active)
  const active = idx > -1 ? progress[idx] : false
  const path = active
    ? `/class/${active.class}/lesson/${active.lesson}/${idx}/${uid}`
    : ''

  const title = (
    <div style={{ textAlign: 'center', padding: 7, ...width }}>
      <h3>{displayName}</h3>
      <a disabled={!active} href={path} target='_blank'>
        View Work
      </a>
    </div>
  )

  const content = tasks.length ? (
    <div style={width}>
      {tasks.map(({ displayName, id }) => (
        <Row key={id} type='flex' align='center' style={{ padding: '10px 0' }}>
          <Col className='ellipsis flex-grow' style={{ paddingRight: 20 }}>
            {displayName}
          </Col>
          <Col>
            <Progress type='circle' width={30} percent={progress[id]} />
          </Col>
        </Row>
      ))}
    </div>
  ) : (
    <div style={{ textAlign: 'center' }}>No Lesson Assigned</div>
  )

  return (
    <Popover
      placement='leftTop'
      title={title}
      style={{ width: 200 }}
      content={content}
      trigger='click'>
      <Row type='flex' align='middle' justify='space-between'>
        <Col>
          <Avatar size='small' style={{ margin: '0px 5px -6px 0' }}>
            {idx + 1}
          </Avatar>
          {displayName}
        </Col>
        <Col>
          <span onClick={stopEvent(() => {})}>
            <Dropdown
              trigger={['click']}
              overlay={
                <Menu onClick={deleteStudent}>
                  <Menu.Item>Remove Student</Menu.Item>
                </Menu>
              }>
              <Button
                icon='ellipsis'
                shape='circle'
                style={{
                  transform: 'rotate(90deg)',
                  background: 'transparent',
                  border: 'none',
                  float: 'right',
                  marginRight: -8
                }} />
            </Dropdown>
          </span>
        </Col>
      </Row>
    </Popover>
  )
}

StudentItem.propTypes = {}

export default enhancer(StudentItem)
