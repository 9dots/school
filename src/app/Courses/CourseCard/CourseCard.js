import modalContainer from 'components/modalContainer'
import { Card, Icon, Button, Avatar } from 'antd'
import AddCourseModal from 'app/AddCourseModal'
import { stopEvent } from '../../../utils'
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
    <Card
      className='course-card'
      onClick={() => console.log('jam')}
      bordered={false}
      title={
        <span>
          <Avatar src={image} style={{ float: 'left' }}>
            {title[0]}
          </Avatar>
          <span>{title}</span>
        </span>
      }
      extra={<span />}>
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
      <Button onClick={stopEvent(showModal('addCourse'))}>
        <Icon type='plus' />Add to Class
      </Button>
      <AddCourseModal
        onOk={hideModal('addCourse')}
        onCancel={hideModal('addCourse')}
        visible={isVisible('addCourse')} />
    </Card>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)
