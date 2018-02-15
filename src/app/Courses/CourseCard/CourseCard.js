import modalContainer from 'components/modalContainer'
import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import { Card, Icon, Button, Avatar } from 'antd'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './CourseCard.less'

const CourseCard = ({ course, modal }) => {
  const {
    displayName,
    tags = {},
    imageUrl,
    difficulty,
    duration = {},
    description,
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
            <Button onClick={stopEvent(modal.showModal(id))}>
              <Icon type='plus' />Add to Class
            </Button>
          }>
          <div className='course-description'>{description}</div>
          <Card.Meta
            description={
              <span>
                <Icon type='clock-circle-o' />
                {duration.time} {duration.unit}
                <Icon type='book' />
                Level {difficulty}
                <Icon type='tag-o' />
                <span className='capitalize'>
                  {Object.keys(tags).join(', ')}
                </span>
              </span>
            } />
        </Card>
      </Link>
      <AddCourseWrapper modal={modal} id={id} />
    </span>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)
