import PropTypes from 'prop-types'
import React from 'react'
import { Card, Button, List } from 'antd'
import './LessonEditor.less'

const LessonEditor = ({ lesson }) => {
  const { displayName, description, tasks = [] } = lesson
  return (
    <Card
      className='course'
      bordered={false}
      style={{ borderRadius: 0 }}
      title={
        <div>
          <h3 style={{ marginBottom: 0 }}>{displayName}</h3>
          <small>{description}</small>
        </div>
      }
      extra={
        <span>
          <Button>Lesson Plan</Button>
          <Button style={{ margin: '0 8px' }}>Slides</Button>
          <Button type='primary' icon='edit' />
        </span>
      }>
      <List
        dataSource={tasks}
        renderItem={({ displayName }) => <List.Item>{displayName}</List.Item>} />
    </Card>
  )
}

LessonEditor.propTypes = {}

export default LessonEditor

const Header = () => <div />
