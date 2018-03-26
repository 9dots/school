import { Card, List, Avatar, Icon, Tooltip, Button } from 'antd'
import modalContainer from 'components/modalContainer'
import LessonProgress from '../LessonProgress'
import PropTypes from 'prop-types'
import React from 'react'

import './ActiveLesson.less'

const ActiveLesson = ({ lesson, modal, studentProgress, activeByTask }) => {
  const { displayName, tasks = [] } = lesson

  return (
    <Card
      className='course'
      title={<h2>{displayName}</h2>}
      bordered={false}
      extra={
        <span>
          <Button type='primary' style={{ marginRight: 10 }}>
            <Icon type='bars' />
            Lesson Plan
          </Button>
          <Button type='primary'>
            <Icon type='file-ppt' />
            Slides
          </Button>
        </span>
      }>
      <List className='task-list'>
        {tasks.map(({ displayName, description, id, url }, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              avatar={<Avatar size='small'>{i + 1}</Avatar>}
              title={
                <span style={{ fontWeight: 'normal' }}>{displayName}</span>
              } />
            {!!activeByTask[i].length && (
              <Tooltip
                overlayStyle={{
                  whiteSpace: 'pre',
                  fontSize: 11
                }}
                title={taskStudents(activeByTask[i])}>
                <div style={{ lineHeight: '30px', marginRight: 10 }}>
                  {activeByTask[i].length} student{activeByTask[i].length > 1 &&
                    's'}
                </div>
              </Tooltip>
            )}
            <Tooltip title='Preview' mouseEnterDelay={0.4}>
              <Button
                href={url}
                target='_blank'
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

function taskStudents (active) {
  const max = 10
  const extra = active.length - max

  return active
    .slice(0, max)
    .map(s => s.displayName)
    .concat(extra > 0 ? `+ ${extra} students` : '')
    .join('\n')
}
