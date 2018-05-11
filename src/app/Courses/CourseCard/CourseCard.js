import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import { idsToText, gradesToText } from 'utils/data'
import { Card, Icon, Button, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { stopEvent } from 'utils'
import enhancer from './enhancer'
import React from 'react'
import './CourseCard.less'

const CourseCard = ({ course, modal, editCourse, editable, setUrl }) => {
  const {
    duration = {},
    displayName,
    description,
    tags = {},
    published,
    bordered,
    imageUrl,
    grade,
    id
  } = course

  const btnStyle = {
    backgroundColor: 'transparent'
  }

  return (
    <span>
      <Link to={`courses/${id}`}>
        <Card
          className='course-card'
          bordered={bordered}
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
              {published && (
                <Button
                  style={btnStyle}
                  onClick={stopEvent(
                    modal.showModal({ name: id, authRequired: true })
                  )}>
                  <Icon type='plus' />Add to Class
                </Button>
              )}
              {editable && (
                <Button
                  style={{ marginLeft: 8, ...btnStyle }}
                  onClick={stopEvent(editCourse)}
                  icon='edit'>
                  {!published && 'Edit Draft'}
                </Button>
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
                {gradesToText(Object.keys(grade))}
                <Icon type='tag-o' />
                {idsToText('tags', Object.keys(tags))}
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
