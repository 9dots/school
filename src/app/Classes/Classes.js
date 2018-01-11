import ClassList from './ClassList'
import StudentList from 'app/StudentList'
import PropTypes from 'prop-types'
import { Card, Layout } from 'antd'
import styles from 'theme/vars/vars.js'
import React from 'react'
import './Classes.less'

const Classes = props => {
  return (
    <Layout>
      <Layout.Sider width={styles['@sidebar-width']}>
        <ClassList />
      </Layout.Sider>
      <Layout.Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: 50,
          backgroundColor: '#FAFAFA'
        }}>
        <LessonCard title={'Lesson 1'} />
        <LessonCard title={'Lesson 2'} />
        <LessonCard title={'Lesson 3'} />
      </Layout.Content>
      <Layout.Sider width={styles['@sidebar-width']}>
        <StudentList />
      </Layout.Sider>
    </Layout>
  )
}

const LessonCard = ({ title }) => (
  <Card style={{ marginBottom: 20, borderRadius: 5 }}>{title}</Card>
)

Classes.propTypes = {}

export default Classes
