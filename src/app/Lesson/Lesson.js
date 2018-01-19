import PropTypes from 'prop-types'
import { Collapse, Button, Icon, Tooltip, Row, Col, List } from 'antd'
import Task from './Task'
import React from 'react'
import './Lesson.less'

function lesson ({ lesson, key }) {
  const { displayName, assigned, description, tasks = [] } = lesson

  return (
    <Collapse.Panel
      className='lesson'
      key={key}
      showArrow={false}
      header={<Header assigned={assigned} title={displayName} />}>
      <p>{description}</p>
      <List direction='vertical'>
        {tasks.map((task, i) => <Task task={task} key={i} i={i} />)}
      </List>
    </Collapse.Panel>
  )
}

const Header = ({ assigned, title }) => (
  <Row type='flex' justify='space-between' align='middle'>
    <Col>
      <h2>{title}</h2>
    </Col>
    <Col>
      <Extra assigned={assigned} />
    </Col>
  </Row>
)

const Extra = ({ assigned }) => {
  return (
    <span>
      <span className='assets'>
        <Tooltip title='Lesson Plan' mouseEnterDelay={0.4}>
          <a
            style={{ marginRight: 12 }}
            onClick={e => {
              e.stopPropagation()
            }}>
            <Icon type='bars' />
          </a>
        </Tooltip>
        <Tooltip title='Slides' mouseEnterDelay={0.4}>
          <a
            onClick={e => {
              e.stopPropagation()
            }}>
            <Icon type='file-ppt' />
          </a>
        </Tooltip>
      </span>
      <span
        onClick={e => {
          e.stopPropagation()
        }}>
        {assigned ? (
          <Button className='active-indicator no-pointer assign-btn'>
            <Icon type='check' />
            Assigned
          </Button>
        ) : (
          <Button ghost type='primary' className='assign-btn'>
            Assign
          </Button>
        )}
      </span>
    </span>
  )
}

export default lesson
