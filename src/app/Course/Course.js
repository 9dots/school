import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import { Card, Avatar, Button, Icon, Col, Row } from 'antd'
import modalContainer from 'components/modalContainer'
import { idsToText, gradesToText } from 'utils/data'
import LessonList from './LessonList'
import PropTypes from 'prop-types'
import React from 'react'

import './Course.less'

const Course = props => {
  const {
    assignToStudent,
    assignedId,
    bordered,
    progress,
    onAssign,
    classId,
    student,
    preview,
    course,
    modal,
    added
  } = props

  const {
    displayName = '',
    duration = {},
    lessons = [],
    description,
    published,
    tags = {},
    imageUrl,
    grade,
    id
  } = course

  return (
    <div>
      <Card
        className='course'
        bordered={bordered}
        title={
          <Row type='flex' justify='middle'>
            <Col>
              <Avatar
                size='large'
                className='xlg'
                src={imageUrl}
                style={{ float: 'left' }}>
                {displayName ? displayName[0] : ''}
              </Avatar>
            </Col>
            <Col className='flex-grow'>
              <h2>{displayName}</h2>
              {!student && (
                <span className='sub-title'>
                  <Icon type='clock-circle-o' />
                  {duration.time} {duration.unit}
                  <Icon type='book' />
                  {gradesToText(Object.keys(grade))}
                  <Icon type='tag-o' />
                  <span className='capitalize'>
                    {idsToText('tags', Object.keys(tags))}
                  </span>
                </span>
              )}
            </Col>
          </Row>
        }
        extra={
          published &&
          !added &&
          !preview && (
            <Button
              className='secondary'
              onClick={modal.showModal({ name: id, authRequired: true })}
              type='primary'>
              <Icon type='plus' />Add to Class
            </Button>
          )
        }>
        {!student && <p>{description}</p>}
        <LessonList
          student={student}
          assignedId={assignedId}
          assignToStudent={assignToStudent}
          progress={progress}
          moduleId={id}
          classId={classId}
          onAssign={onAssign}
          lessons={lessons}
          added={added} />
        <AddCourseWrapper
          modal={modal}
          displayName={displayName}
          id={id}
          name={id} />
      </Card>
    </div>
  )
}

Course.propTypes = {}

export default modalContainer(Course)
