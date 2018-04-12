import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import { Card, Icon, Button, Avatar } from 'antd'
import { stopEvent } from 'utils'
import { idsToText } from 'utils/data'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './CourseCard.less'

const CourseCard = ({ course, modal, editable, setUrl }) => {
  const {
    duration = {},
    displayName,
    description,
    difficulty,
    tags = {},
    imageUrl,
    id
  } = course

  return (
    <span>
      <Link to={`courses/${id}`}>
        <Card
          className='course-card'
          bordered={false}
          title={
            <span>
              <Avatar src={imageUrl} style={{ float: 'left' }}>
                {displayName[0]}
              </Avatar>
              <span>{displayName}</span>
            </span>
          }
          extra={
            <span>
              <Button onClick={stopEvent(modal.showModal(id))}>
                <Icon type='plus' />Add to Class
              </Button>
              {editable && (
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={stopEvent(() =>
                    setUrl(`/courses/${course.id}/edit`)
                  )}
                  icon='edit' />
              )}
            </span>
          }>
          <div className='course-description'>{description}</div>
          <Card.Meta
            description={
              <span className='ellipsis'>
                <Icon type='clock-circle-o' />
                {duration.time} {duration.unit}
                <Icon type='book' />
                {idsToText('difficulty', difficulty)}
                <Icon type='tag-o' />
                {idsToText('tags', Object.keys(tags)).join(', ')}
              </span>
            } />
        </Card>
      </Link>
      <AddCourseWrapper
        modal={modal}
        displayName={displayName}
        id={id}
        name={id} />
    </span>
  )
}

CourseCard.propTypes = {}

export default enhancer(CourseCard)
