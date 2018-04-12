import { Collapse, Tooltip, Button, Avatar, Icon, List, Row, Col } from 'antd'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './LessonList.less'

const LessonList = ({
  studentLessons,
  lessons = [],
  assignedId,
  onAssign,
  progress,
  moduleId,
  student,
  classId,
  added,
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
                moduleId={moduleId}
                {...lesson}
                lesson={lesson}
                added={added}
                classId={classId}
                progress={progress[lesson.id] || {}}
                student={student}
                i={lesson.id} />
            }>
            <Tasks lesson={lesson} classId={classId} student={student} />
          </Collapse.Panel>
        )
      })}
    </Collapse>
  )
}

const Header = props => {
  const {
    displayName,
    description,
    assigned,
    onAssign,
    moduleId,
    student,
    progress = {},
    classId,
    lesson,
    added
  } = props

  return (
    <Row className='clearfix' type='flex' justify='space-between'>
      <Col className='lesson-header flex-grow' style={{ paddingRight: 10 }}>
        <h3>{displayName}</h3>
        <p>{description}</p>
      </Col>
      <Col className='extra'>
        {student ? (
          <StudentExtra
            path={`/class/${classId}/lesson/${lesson.id}/${progress.current ||
              0}`}
            started={typeof progress.current !== 'undefined'}
            assigned={assigned} />
        ) : (
          <TeacherExtra
            lesson={lesson}
            onAssign={onAssign}
            moduleId={moduleId}
            added={added}
            assigned={assigned} />
        )}
      </Col>
    </Row>
  )
}

const Tasks = ({ lesson: { tasks, id }, classId, student }) => (
  <List className='task-list'>
    {tasks.map(({ displayName, description }, i) => (
      <List.Item key={id + '-' + i}>
        <List.Item.Meta
          avatar={<Avatar size='small'>{i + 1}</Avatar>}
          title={displayName}
          description={description} />
        {student ? (
          <Link to={`/class/${classId}/lesson/${id}/${i}`} className='extra'>
            <Icon type='caret-right' />
            Play
          </Link>
        ) : (
          <Link to={'/'} className='extra'>
            <Icon type='eye-o' />
            Preview
          </Link>
        )}
      </List.Item>
    ))}
  </List>
)

const StudentExtra = ({ assigned, path, started }) => {
  return (
    <div style={{ paddingLeft: 20 }}>
      {assigned && (
        <Button
          type='primary'
          className='green no-pointer'
          style={{ borderRadius: 20, width: 95, marginRight: 10 }}>
          Assigned
        </Button>
      )}
      <Link to={path}>
        {started ? 'Continue' : 'Start'}
        <Icon type='caret-right' style={{ marginLeft: 5 }} />
      </Link>
    </div>
  )
}

const TeacherExtra = ({ added, moduleId, assigned, onAssign, lesson }) => {
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
            onClick={e => e.stopPropagation()}>
            {/* Must use stopProp instead of stopEvent so a tags work */}
            <a target='_blank' href={lesson.lessonPlan}>
              <Icon type='bars' />
            </a>
          </Tooltip>
          <Tooltip
            title='Slides'
            mouseEnterDelay={0.4}
            onClick={e => e.stopPropagation()}>
            {/* Must use stopProp instead of stopEvent so a tags work */}
            <a target='_blank' href={lesson.slides}>
              <Icon type='file-ppt' />
            </a>
          </Tooltip>
          {assigned ? (
            <Button
              type='primary'
              className='green no-pointer'
              style={{ borderRadius: 20, width: 95 }}>
              Assigned
            </Button>
          ) : (
            <Button
              onClick={stopEvent(onAssign(lesson, moduleId))}
              style={{ width: 95 }}>
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

export default enhancer(LessonList)
