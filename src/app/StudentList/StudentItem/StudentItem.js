import { compose, withHandlers } from 'recompose'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { rpc } from '../../actions'
import React from 'react'
import {
  Progress,
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
      <Link disabled={!active} to={path}>
        View Work
      </Link>
    </div>
  )

  const content = tasks.length ? (
    <div style={width}>
      {progress.map(({ displayName, id, progress: percent }) => (
        <Row key={id} type='flex' align='center' style={{ padding: '10px 0' }}>
          <Col className='ellipsis flex-grow' style={{ paddingRight: 20 }}>
            {displayName}
          </Col>
          <Col>
            <Progress type='circle' width={30} percent={percent} />
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
      <Row
        type='flex'
        align='middle'
        style={{ height: 40 }}
        justify='space-between'
        className='student-item'>
        <Col>
          <div>{displayName}</div>
          {active && (
            <div className='meta'>
              {idx + 1}.&ensp;{active.displayName}
            </div>
          )}
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
