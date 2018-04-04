import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import { Layout, Divider, Row, Col, Icon } from 'antd'
import { courses } from '../../selectors'
import CourseCard from './CourseCard'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import Loading from '../Loading'
import React from 'react'
import './Courses.less'

const enhancer = compose(
  firestoreConnect(props => [
    { collection: 'courses', where: ['featured', '==', true] }
  ]),
  connect((state, props) => ({ courses: courses(state) })),
  waitFor(['courses'])
)

const Courses = props => {
  if (!props.isLoaded) return <Loading />
  return (
    <Layout>
      <Layout.Header>
        <h2>COURSES</h2>
      </Layout.Header>

      <Layout.Content>
        <div style={{ padding: '30px 50px' }}>
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
      </Layout.Content>
    </Layout>
  )
}

export default enhancer(Courses)
