import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import modalContainer from '../../components/modalContainer'
import { Card, Avatar, Button, Icon } from 'antd'
import LessonList from './LessonList'
import PropTypes from 'prop-types'
import React from 'react'

import './Course.less'

const Course = ({ modal, added, course, classId, assignedId }) => {
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
        <span>
          <Avatar
            size='large'
            className='xlg'
            src={imageUrl}
            style={{ float: 'left' }}>
            {displayName ? displayName[0] : ''}
          </Avatar>
          <div>
            <h2>{displayName}</h2>
            <span className='sub-title'>
              <Icon type='clock-circle-o' />
              {duration.time} {duration.unit}
              <Icon type='book' />
              Level {difficulty}
              <Icon type='tag-o' />
              <span className='capitalize'>{Object.keys(tags).join(', ')}</span>
            </span>
          </div>
        </span>
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
      <p>{description}</p>
      <LessonList
        assignedId={assignedId}
        classId={classId}
        lessons={lessons}
        added={added} />
      <AddCourseWrapper modal={modal} id={id} name={id} />
    </Card>
  )
}

Course.propTypes = {}

export default modalContainer(Course)
