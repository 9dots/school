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
    description
  } = course

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
            <Button onClick={stopEvent(showModal('addCourse'))}>
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
                <Icon
                  type='clock-circle-o'
                  style={{ margin: '0 5px 0 10px' }} />
                {duration.time} {duration.unit}
              </span>
            } />
        </Card>
      </Link>
      <AddCourseModal
        onOk={hideModal('addCourse')}
        onCancel={hideModal('addCourse')}
        visible={isVisible('addCourse')} />
    </span>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)
