import { firestoreConnect } from 'react-redux-firebase'
import DrivePicker from 'components/DrivePicker'
import { courses } from '../../selectors'
import waitFor from 'components/waitFor'
import { Layout, Row, Col, Button } from 'antd'
import CourseCard from './CourseCard'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Loading from '../Loading'
import React from 'react'
import './Courses.less'

const enhancer = compose(
  firestoreConnect(props => [
    {
      collection: 'courses',
      where: [['featured', '==', true], ['published', '==', true]]
    }
  ]),
  connect((state, props) => ({ courses: courses(state) })),
  waitFor(['courses'])
)

const Courses = ({ isLoaded, courses, header = true }) => {
  if (!isLoaded) return <Loading />

  return (
    <Layout>
      {!!header && (
        <Layout.Header>
          <h2>COURSES</h2>
        </Layout.Header>
      )}
      <Layout.Content>
        <div style={{ padding: '30px 50px' }}>
          <Row gutter={24} align='middle'>
            {courses.map((course, key) => (
              <Col span={12} key={key}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  )
}

export default enhancer(Courses)
