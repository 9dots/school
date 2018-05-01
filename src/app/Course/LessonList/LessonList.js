import { Collapse, Tooltip, Button, Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { stopEvent } from 'utils'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Tasks from './Tasks'
import React from 'react'

import './LessonList.less'

const LessonList = ({
  assignToStudent,
  studentLessons,
  lessons = [],
  assignedId,
  onAssign,
  progress,
  moduleId,
  isLoaded,
  student,
  classId,
  added,
  ...rest
}) => {
  if (!isLoaded) return <span />
  return (
    <Collapse accordion bordered={false} className='lesson-list' {...rest}>
      {(lessons || []).map((lesson, key) => {
        return (
          <Collapse.Panel
            key={key}
            header={
              <Header
                assignToStudent={assignToStudent}
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
    assignToStudent,
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
            module={moduleId}
            lesson={lesson.id}
            assignToStudent={assignToStudent}
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

const StudentExtra = ({
  lesson,
  module,
  assigned,
  path,
  started,
  assignToStudent
}) => {
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
      <Link onClick={assignToStudent(lesson, module)} to={path}>
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
            <Button
              target='_blank'
              href={lesson.lessonPlan}
              style={{ border: 'none' }}
              icon='bars' />
          </Tooltip>
          <Tooltip
            title='Slides'
            mouseEnterDelay={0.4}
            onClick={e => e.stopPropagation()}>
            {/* Must use stopProp instead of stopEvent so a tags work */}
            <Button
              target='_blank'
              style={{ border: 'none' }}
              href={lesson.slides}
              icon='file-ppt' />
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
