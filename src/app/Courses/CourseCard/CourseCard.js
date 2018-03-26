import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import modalContainer from 'components/modalContainer'
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
                {difficulty}
                <Icon type='tag-o' />
                {Object.keys(tags).join(', ')}
              </span>
            } />
        </Card>
      </Link>
      <AddCourseWrapper
        modal={modal}
        displayName={displayName}
        id={id}
        name={id} />
      {/* {modal.isVisible(id) && (
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
      )} */}
    </span>
  )
}

CourseCard.propTypes = {}

export default modalContainer(CourseCard)

function getSuccessModal (id) {
  return 'success-' + (id || 'modal')
}
