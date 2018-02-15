import modalContainer from 'components/modalContainer'
import { Card, Icon, Button, Avatar } from 'antd'
import AddCourseModal from 'app/AddCourseModal'
import AddSuccessModal from 'app/AddCourseModal/AddSuccessModal'
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
      {modal.isVisible(id) && (
        <AddCourseModal
          id={id}
          courseId={id}
          onOk={modal.hideModal(id)}
          onCancel={modal.hideModal(id)}
          visible />
      )}
      {modal.isVisible(getSuccessModal(id)) && (
        <AddSuccessModal
          {...modal.getProps(getSuccessModal(id))}
          onCancel={modal.hideModal(getSuccessModal(id))}
          onOk={modal.hideModal(getSuccessModal(id))}
          visible />
      )}
    </span>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)

function getSuccessModal (id) {
  return 'success-' + (id || 'modal')
}
