import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { Collapse, Tooltip, Button, Avatar, Icon, List, Row, Col } from 'antd'

import './LessonList.less'

const LessonList = ({
  lessons = [],
  added,
  onAssign,
  assignedId,
  student,
  ...rest
}) => {
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {lessons.map((lesson, key) => {
        return (
          <Collapse.Panel
            key={key}
            header={
              <Header
                onAssign={onAssign}
                assigned={assignedId === lesson.id}
                {...lesson}
                lesson={lesson}
                added={added}
                student={student}
                i={lesson.id} />
            }>
            <Tasks tasks={lesson.tasks} student={student} />
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

const Header = props => {
  const {
    onAssign,
    displayName,
    description,
    added,
    lesson,
    assigned,
    student
  } = props
  return (
    <Row className='clearfix' type='flex' justify='space-between'>
      <Col className='lesson-header flex-grow' style={{ paddingRight: 10 }}>
        <h3>{displayName}</h3>
        <p>{description}</p>
      </Col>
      <Col className='extra'>
        {student ? (
          <StudentExtra student={student} assigned={assigned} />
        ) : (
          <TeacherExtra
            lesson={lesson}
            onAssign={onAssign}
            added={added}
            assigned={assigned} />
        )}
      </Col>
    </Row>
  )
}

const Tasks = ({ tasks }) => (
  <List className='task-list'>
    {tasks.map(({ displayName, description }, i) => (
      <List.Item key={i}>
        <List.Item.Meta
          avatar={<Avatar size='small'>{i + 1}</Avatar>}
          title={displayName}
          description={description} />

        <Link to={'/'} className='extra'>
          <Icon type='eye-o' />
          Preview
        </Link>
      </List.Item>
    ))}
  </List>
)

const StudentExtra = ({ assigned, student }) => {
  return (
    <div style={{ paddingLeft: 20 }}>
      {assigned ? (
        <Button
          type='primary'
          className='green no-pointer'
          style={{ borderRadius: 20, width: 95 }}>
          Assigned
        </Button>
      ) : (
        'Student'
      )}
    </div>
  )
}

const TeacherExtra = ({ added, assigned, onAssign, lesson }) => {
  return (
    <span>
      {!added ? (
        <span>
          <Button onClick={e => e.stopPropagation()}>
            <Icon type='file-ppt' />
            Slides
          </Button>
          <Button onClick={e => e.stopPropagation()}>
            <Icon type='profile' />
            Lesson Plan
          </Button>
        </span>
      ) : (
        <span>
          <Tooltip
            title='Lesson Plan'
            mouseEnterDelay={0.4}
            onClick={stopEvent(() => {})}>
            <Icon type='bars' />
          </Tooltip>
          <Tooltip
            title='Slides'
            mouseEnterDelay={0.4}
            onClick={stopEvent(() => {})}>
            <Icon type='file-ppt' />
          </Tooltip>
          {assigned ? (
            <Button
              type='primary'
              className='green no-pointer'
              style={{ borderRadius: 20, width: 95 }}>
              Assigned
            </Button>
          ) : (
            <Button onClick={stopEvent(onAssign(lesson))} style={{ width: 95 }}>
              <Icon type='export' />
              Assign
            </Button>
          )}
        </span>
      )}
    </span>
  )
}

LessonList.propTypes = {}

export default LessonList
