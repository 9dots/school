import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import modalContainer from '../../components/modalContainer'
import { Card, Avatar, Button, Icon, Col, Row } from 'antd'
import LessonList from './LessonList'
import PropTypes from 'prop-types'
import React from 'react'

import './Course.less'

const Course = ({
  modal,
  added,
  course,
  classId,
  assignedId,
  onAssign,
  student
}) => {
  const {
    displayName = '',
    duration = {},
    lessons = [],
    description,
    difficulty,
    tags = {},
    imageUrl,
    id
  } = course
  return (
    <Card
      className='course'
      bordered={false}
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
                Level {difficulty}
                <Icon type='tag-o' />
                <span className='capitalize'>
                  {Object.keys(tags).join(', ')}
                </span>
              </span>
            )}
          </Col>
        </Row>
      }
      extra={
        !added && (
          <Button
            className='secondary'
            onClick={modal.showModal(id)}
            type='primary'>
            <Icon type='plus' />Add to Class
          </Button>
        )
      }>
      {!student && <p>{description}</p>}
      <LessonList
        student={student}
        assignedId={assignedId}
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
  )
}

Course.propTypes = {}

export default modalContainer(Course)
