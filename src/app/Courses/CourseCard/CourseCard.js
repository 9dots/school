import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import './CourseCard.less'
import { Card, Icon, Button, Avatar } from 'antd'

const CourseCard = ({ course }) => {
  const {
    title,
    tags = [],
    image,
    difficulty,
    duration = {},
    description
  } = course

  return (
    <Link to='/courses/courseId'>
      <Card
        className='course-card'
        bordered={false}
        title={
          <span>
            <Avatar src={image} style={{ float: 'left' }}>
              {title[0]}
            </Avatar>
            <span>{title}</span>
          </span>
        }
        extra={
          <Button>
            <Icon type='plus' />Add to Class
          </Button>
        }>
        <div className='course-description'>{description}</div>
        <Card.Meta
          description={
            <span>
              <Icon type='tag-o' style={{ marginRight: '5px' }} />
              {tags.join(', ')}
              <Icon type='book' style={{ margin: '0 5px 0 10px' }} />
              {difficulty}
              <Icon type='clock-circle-o' style={{ margin: '0 5px 0 10px' }} />
              {duration.time} {duration.unit}
            </span>
          } />
      </Card>
    </Link>
  )
}

CourseCard.propTypes = {}

export default CourseCard
