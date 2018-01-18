import ClassList from './ClassList'
import StudentList from 'app/StudentList'
import PropTypes from 'prop-types'
import lesson from 'app/Lesson'
import { Collapse, Layout } from 'antd'
import styles from 'theme/vars/vars.js'
import React, { Component } from 'react'
import './Classes.less'

class Classes extends Component {
  render () {
    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <ClassList />
        </Layout.Sider>
        <Layout.Content
          style={{
            minHeight: 'calc(100vh - 64px)',
            padding: 50,
            backgroundColor: '#F7F7F7'
          }}>
          <Collapse
            defaultActiveKey={['0']}
            bordered={false}
            className='lessons-collapse'>
            {lessons.map((val, key) => lesson({ lesson: val, key }))}
          </Collapse>
        </Layout.Content>
        <Layout.Sider width={styles['@sidebar-width']}>
          <StudentList />
        </Layout.Sider>
      </Layout>
    )
  }
}

Classes.propTypes = {}

export default Classes

const lessons = [
  {
    title: 'Myster Robot',
    assigned: true
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
  },
  {
    title: 'PixelBots'
  }
]
