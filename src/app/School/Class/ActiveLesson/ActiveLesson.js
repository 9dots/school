import { Card, List, Avatar, Icon, Tooltip, Button } from 'antd'
import modalContainer from 'components/modalContainer'
import LessonProgress from '../LessonProgress'
import PropTypes from 'prop-types'
import React from 'react'

import './ActiveLesson.less'

const ActiveLesson = ({ lesson, modal, studentProgress }) => {
  const { displayName, tasks = [] } = lesson

  return (
    <Card
      className='course'
      title={<h2>{displayName}</h2>}
      bordered={false}
      extra={
        <span>
          <Button style={{ marginRight: 10 }}>
            <Icon type='bars' />
            Lesson Plan
          </Button>
          <Button>
            <Icon type='file-ppt' />
            Slides
          </Button>
        </span>
      }>
      <List className='task-list'>
        {tasks.map(({ displayName, description, id }, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              avatar={<Avatar size='small'>{i + 1}</Avatar>}
              title={
                <span style={{ fontWeight: 'normal' }}>{displayName}</span>
              } />

            <Tooltip title='Preview' mouseEnterDelay={0.4}>
              <Button
                shape='circle'
                icon='eye-o'
                style={{ marginRight: 7, border: 'none' }} />
            </Tooltip>
            <Tooltip title='Progress' mouseEnterDelay={0.4}>
              <Button
                style={{ border: 'none' }}
                shape='circle'
                onClick={modal.showModal({ name: 'lessonModal', active: id })}
                icon='line-chart' />
            </Tooltip>
          </List.Item>
        ))}
      </List>
      {modal.isVisible('lessonModal') && (
        <LessonProgress
          {...modal.getProps('lessonModal')}
          visible
          lesson={lesson}
          studentProgress={studentProgress}
          onOk={modal.hideModal('lessonModal')}
          onCancel={modal.hideModal('lessonModal')} />
      )}
    </Card>
  )
}

ActiveLesson.propTypes = {}

export default modalContainer(ActiveLesson)
