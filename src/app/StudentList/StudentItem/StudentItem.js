import { Row, Col, Button, Modal, message } from 'antd'
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

const StudentItem = props => {
  const { user = {} } = props
  return (
    <Row type='flex' justify='space-between' align='middle'>
      <Col>{user.displayName}</Col>
      <Col className='class-actions'>
        <Button
          type='primary'
          ghost
          onClick={stopEvent(props.deleteStudent)}
          icon='user-delete'
          shape='circle'
          size='small' />
      </Col>
    </Row>
  )
}

StudentItem.propTypes = {}

export default enhancer(StudentItem)

function getOk () {}
