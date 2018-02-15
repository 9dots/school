import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import { Divider, Row, Col, Icon } from 'antd'
import { courses } from '../../selectors'
import CourseCard from './CourseCard'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Loading from '../Loading'
import React from 'react'
import './Courses.less'

const enhancer = compose(
  firestoreConnect(props => [{ collection: 'courses' }]),
  connect((state, props) => ({ courses: courses(state) })),
  waitFor(['courses'])
)

const Courses = props => {
  if (!props.isLoaded) return <Loading />
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
        {props.courses.map((course, key) => (
          <Col span={12} key={key}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default enhancer(Courses)

// const courses = [
//   {
//     title: 'Intro to Computers',
//     id: 'abc123',
//     image:
//       'https://cdn.dribbble.com/users/59100/screenshots/3358559/pcc_1x.jpg',
//     tags: ['Computers', 'Math', 'Javascript'],
//     difficulty: 'Level A',
//     duration: {
//       unit: 'months',
//       time: 2
//     },
//     description:
//       'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
//   },
//   {
//     title: 'Waffles',
//     id: 'bbaf234',
//     image:
//       'https://cdn.dribbble.com/users/14268/screenshots/824210/waffle_1x.png',
//     tags: ['Computers', 'Math', 'Javascript'],
//     difficulty: 'Level A',
//     duration: {
//       unit: 'months',
//       time: 2
//     },
//     description:
//       'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
//   },
//   {
//     title: 'Earth Sciences',
//     image: 'E',
//     id: 'asdgasg',
//     tags: ['Computers', 'Math', 'Javascript'],
//     difficulty: 'Level A',
//     duration: {
//       unit: 'months',
//       time: 2
//     },
//     description:
//       'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
//   },
//   {
//     title: 'Learn More',
//     id: 'asligjasi34',
//     tags: ['Computers', 'Math', 'Javascript'],
//     difficulty: 'Level A',
//     duration: {
//       unit: 'months',
//       time: 2
//     },
//     description:
//       'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'
//   }
// ]
