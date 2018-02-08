import modalContainer from 'components/modalContainer'
import { Card, Icon, Button, Avatar } from 'antd'
import AddCourseModal from 'app/AddCourseModal'
import { stopEvent } from '../../../utils'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './CourseCard.less'

const CourseCard = ({ course, hideModal, showModal, isVisible }) => {
  const {
    title,
    tags = [],
    image,
    difficulty,
    duration = {},
    description,
    id
  } = course

  const modalId = 'addCourse-' + title

  return (
    <span>
      <Link to='courses/coursId'>
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
            <Button onClick={stopEvent(showModal(modalId))}>
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
                {difficulty}
                <Icon type='tag-o' />
                {tags.join(', ')}
              </span>
            } />
        </Card>
      </Link>
      <AddCourseModal
        onOk={hideModal(modalId)}
        onCancel={hideModal(modalId)}
        visible={isVisible(modalId)} />
    </span>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)
