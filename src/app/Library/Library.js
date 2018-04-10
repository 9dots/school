import { Layout, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import CreateCourseModal from '../CreateCourseModal'
import CourseCard from '../Courses/CourseCard'
import React from 'react'
import './Library.less'

const Library = ({ modal, onCreateCourse, courses = [], uid }) => {
  return (
    <Layout>
      <Layout.Header>
        <Row type='flex'>
          <Col className='flex-grow'>
            <h2>My Library</h2>
          </Col>
          <Col>
            <Button
              icon='plus'
              type='primary'
              className='secondary'
              onClick={modal.showModal('createCourse')}>
              Create Course
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      {modal.isVisible('createCourse') && (
        <CreateCourseModal
          visible
          onOk={onCreateCourse}
          onCancel={modal.hideModal('createCourse')} />
      )}

      <Layout.Content style={{ padding: '30px 50px' }}>
        <Row gutter={24} align='middle'>
          {courses.map((course, key) => (
            <Col span={12} key={key}>
              <CourseCard course={course} editable />
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </Layout>
  )
}

Library.propTypes = {}

export default enhancer(Library)
