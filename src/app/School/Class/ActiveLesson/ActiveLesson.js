import { Card, List, Icon, Tooltip, Button } from 'antd'
import { getTaskIcon } from 'utils/data'
import modalContainer from 'components/modalContainer'
import TaskDot from 'components/TaskDot'
import LessonProgress from '../LessonProgress'
import PropTypes from 'prop-types'
import React from 'react'

import './ActiveLesson.less'

const ActiveLesson = ({ lesson, modal, studentProgress, activeByTask }) => {
  const { displayName, tasks = [], slides, lessonPlan } = lesson
  return (
    <Card
      className='course'
      title={<h2>{displayName}</h2>}
      bordered={false}
      extra={
        <span>
          <Button
            href={lessonPlan}
            target='_blank'
            type='primary'
            style={{ marginRight: 10 }}>
            <Icon type='bars' />
            Lesson Plan
          </Button>
          <Button href={slides} target='_blank' type='primary'>
            <Icon type='file-ppt' />
            Slides
          </Button>
        </span>
      }>
      <List className='task-list'>
        {tasks.map((task, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              avatar={<TaskDot tasks={tasks} task={task} number={i + 1} />}
              title={
                <span style={{ fontWeight: 'normal' }}>
                  <Icon
                    type={getTaskIcon(task.type)}
                    style={{ marginRight: 5 }} />
                  {task.displayName}
                </span>
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
                href={task.url}
                target='_blank'
                shape='circle'
                icon='eye-o'
                style={{ marginRight: 7, border: 'none' }} />
            </Tooltip>
            <Tooltip title='Progress' mouseEnterDelay={0.4}>
              <Button
                style={{ border: 'none' }}
                shape='circle'
                onClick={modal.showModal({
                  name: 'lessonModal',
                  active: task.id
                })}
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
