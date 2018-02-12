import { Divider, Row, Col, Icon } from 'antd'
import React, { Component } from 'react'
import CourseCard from './CourseCard'
import './Courses.less'

class Courses extends Component {
  render () {
    return (
      <div className='main-col' style={{ padding: '30px 0' }}>
        <h2>COURSES</h2>
        <Divider />
        <div>
          <h4 style={{ float: 'left', marginRight: 10 }}>Get Started</h4>
          <span>
            View All
            <Icon type='right' style={{ marginLeft: 5 }} />
          </span>
        </div>
        <br />
        <Row gutter={24} align='middle'>
          {courses.map((course, key) => (
            <Col span={12} key={key}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

export default Courses

const courses = [
  {
    title: 'Intro to Computers',
    image:
      'https://cdn.dribbble.com/users/59100/screenshots/3358559/pcc_1x.jpg',
    tags: ['Computers', 'Math', 'Javascript'],
    difficulty: 'Level A',
    duration: {
      unit: 'months',
      time: 2
    },
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
  },
  {
    title: 'Waffles',
    image:
      'https://cdn.dribbble.com/users/14268/screenshots/824210/waffle_1x.png',
    tags: ['Computers', 'Math', 'Javascript'],
    difficulty: 'Level A',
    duration: {
      unit: 'months',
      time: 2
    },
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
  },
  {
    title: 'Earth Sciences',
    image: 'E',
    tags: ['Computers', 'Math', 'Javascript'],
    difficulty: 'Level A',
    duration: {
      unit: 'months',
      time: 2
    },
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
  },
  {
    title: 'Learn More',
    tags: ['Computers', 'Math', 'Javascript'],
    difficulty: 'Level A',
    duration: {
      unit: 'months',
      time: 2
    },
    description:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
  }
]
