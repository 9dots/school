import ClassList from './ClassList'
import StudentList from 'app/StudentList'
import PropTypes from 'prop-types'
import { Row, Col, Card, Layout } from 'antd'
import styles from 'theme/vars/vars.js'
import React from 'react'
import './Classes.less'

const Classes = props => {
  return (
    <Layout>
      <Layout.Sider width={styles['@sidebar-width']}>
        <ClassList />
      </Layout.Sider>
      <Col
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: 50,
          backgroundColor: '#FAFAFA'
        }}
        span={16}>
        <LessonCard title={'Lesson 1'} />
        <LessonCard title={'Lesson 2'} />
        <LessonCard title={'Lesson 3'} />
      </Col>
      <Col span={4}>
        <StudentList />
      </Col>
    </Layout>
  )
}

const LessonCard = ({ title }) => (
  <Card style={{ marginBottom: 20, borderRadius: 5 }}>{title}</Card>
)

Classes.propTypes = {}

export default Classes
