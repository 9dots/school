import { Card, Avatar, Button, Icon } from 'antd'
import LessonList from './LessonList'
import PropTypes from 'prop-types'
import modalContainer from '../../components/modalContainer'
import React from 'react'
import AddCourseWrapper from 'app/AddCourseModal/AddCourseWrapper'
import './Course.less'

const Course = ({ modal, added, course }) => {
  const {
    displayName = '',
    description,
    difficulty,
    tags = {},
    duration = {},
    imageUrl,
    id,
    lessons = []
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
      <LessonList lessons={lessons} added={added} />
      <AddCourseWrapper modal={modal} id={id} name={id} />
    </Card>
  )
}

Course.propTypes = {}

export default modalContainer(Course)

const courseData = {
  displayName: 'Intro to Computers',
  imageUrl:
    'https://cdn.dribbble.com/users/59100/screenshots/3358559/pcc_1x.jpg',
  tags: { computers: true, math: true, javascript: true },
  difficulty: 'A',
  duration: {
    unit: 'months',
    time: 2
  },
  description:
    'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.',
  lessons: [
    {
      displayName: 'Get Started',
      description: 'Do what the task tells you to do'
    },
    {
      displayName: 'Make a Taco!',
      description: 'Follow the link that is provide www.tacojam.com'
    },
    {
      displayName: 'Do a PixelBots lesson',
      description:
        "Go to pixelBots and do the what you're supposed to do.  Do it now!"
    },
    {
      displayName: 'Get Started',
      description: 'Do what the task tells you to do'
    },
    {
      displayName: 'Make a Taco!',
      description: 'Follow the link that is provide www.tacojam.com'
    },
    {
      displayName: 'Do a PixelBots lesson',
      description:
        "Go to pixelBots and do the what you're supposed to do.  Do it now!"
    }
  ]
}
