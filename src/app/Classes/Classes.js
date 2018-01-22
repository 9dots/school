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
            defaultActiveKey={['active']}
            bordered={false}
            className='lessons-collapse'>
            {lesson({ lesson: lessons[0], key: 'active' })}
          </Collapse>
          <Collapse bordered={false} className='lessons-collapse'>
            {lessons.slice(1).map((val, key) => lesson({ lesson: val, key }))}
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
    displayName: 'Myster Robot',
    assigned: true,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tasks: [
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
  },
  {
    displayName: 'pixelBotGo'
  },
  {
    displayName: 'Multiple Steps'
  },
  {
    displayName: 'Step By Step'
  },
  {
    displayName: 'Step it Up'
  },
  {
    displayName: 'PixelBots'
  },
  {
    displayName: 'J@m taC0 5alAd'
  },
  {
    displayName: 'PixelBots'
  }
]
