import { Popover, Row, Col, Progress, Button, Modal, message } from 'antd'
import { firestoreConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { stopEvent } from '../../../utils'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { rpc } from '../../actions'
import React from 'react'
import './StudentItem.less'

const confirm = Modal.confirm

const enhancer = compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      storeAs: props.uid
    }
  ]),
  connect(
    ({ firestore: { data } }, props) => ({
      user: data[props.uid]
    }),
    { rpc }
  ),
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
  user = {},
  deleteStudent,
  progress = [],
  tasks = []
}) => {
  const { displayName } = user
  const width = {
    width: 210,
    maxWidth: 210
  }

  const title = (
    <div style={{ textAlign: 'center', padding: 7, ...width }}>
      <h3>{displayName}</h3>
      <span style={{ fontSize: 11 }}>
        <a>View Work</a>&ensp;&middot;&ensp;
        <a onClick={stopEvent(deleteStudent)}>Remove Student</a>
      </span>
    </div>
  )
  const progressMap = progress.reduce(
    (acc, p) => ({
      ...acc,
      [p.activity]: p.progress
    }),
    {}
  )

  const content = (
    <div style={width}>
      {tasks.map(({ displayName, id }) => (
        <Row key={id} type='flex' align='center' style={{ padding: '10px 0' }}>
          <Col className='ellipsis flex-grow' style={{ paddingRight: 20 }}>
            {displayName}
          </Col>
          <Col>
            <Progress type='circle' width={30} percent={progressMap[id]} />
          </Col>
        </Row>
      ))}
    </div>
  )

  return (
    <Popover
      placement='leftTop'
      title={title}
      style={{ width: 200 }}
      content={content}
      trigger='click'>
      <div>{user.displayName}</div>
    </Popover>
  )
}

StudentItem.propTypes = {}

export default enhancer(StudentItem)
