import { Card, Avatar, Button, Icon } from 'antd'
import LessonList from './LessonList'
import PropTypes from 'prop-types'
import React from 'react'
import './Course.less'

const Course = props => {
  const {
    description,
    difficulty,
    tags = [],
    duration,
    lessons,
    title,
    image
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
            src={image}
            style={{ float: 'left' }}>
            {title[0]}
          </Avatar>
          <div>
            <h2>{title}</h2>
            <span className='sub-title'>
              <Icon type='clock-circle-o' />
              {duration.time} {duration.unit}
              <Icon type='book' />
              {difficulty}
              <Icon type='tag-o' />
              {tags.join(', ')}
            </span>
          </div>
        </span>
      }
      extra={
        <Button className='secondary' type='primary'>
          <Icon type='plus' />Add to Class
        </Button>
      }>
      <p>{description}</p>
      <LessonList lessons={lessons} />
    </Card>
  )
}

Course.propTypes = {}

export default Course

const course = {
  title: 'Intro to Computers',
  image: 'https://cdn.dribbble.com/users/59100/screenshots/3358559/pcc_1x.jpg',
  tags: ['Computers', 'Math', 'Javascript'],
  difficulty: 'Level A',
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