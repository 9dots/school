import { compose, withHandlers, withProps } from 'recompose'
import { stopEvent } from '../../../utils'
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
    deleteStudent: ({ rpc, class: { id, displayName }, uid, user }) => () => {
      confirm({
        title: 'Remove Student',
        content: `Are you sure want to remove ${
          user.displayName
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
  student = {},
  tasks = [],
  user = {},
  progress
}) => {
  const { displayName } = student
  const width = {
    width: 210,
    maxWidth: 210
  }
  const title = (
    <div style={{ textAlign: 'center', padding: 7, ...width }}>
      <h3>{displayName}</h3>
      <a>View Work</a>
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
        <Col>{displayName}</Col>
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
