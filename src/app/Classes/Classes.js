import ClassList from './ClassList'
import StudentList from 'app/StudentList'
import PropTypes from 'prop-types'
import Lesson from 'app/Lesson'
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
        {lessons.map((lesson, i) => <Lesson lesson={lesson} key={i} />)}
      </Layout.Content>
      <Layout.Sider width={styles['@sidebar-width']}>
        <StudentList />
      </Layout.Sider>
    </Layout>
  )
}

Classes.propTypes = {}

export default Classes

const lessons = [
  {
    title: 'Myster Robot',
    status: 'active'
  },
  {
    title: 'pixelBotGo'
  },
  {
    title: 'Multiple Steps'
  },
  {
    title: 'Step By Step'
  },
  {
    title: 'Step it Up'
  },
  {
    title: 'PixelBots'
  },
  {
    title: 'J@m taC0 5alAd'
  }
]
