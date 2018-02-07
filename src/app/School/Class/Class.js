import { Collapse, Layout, Divider, Icon, Button } from 'antd'
import backpack from 'assets/images/emptypack.png'
import StudentList from 'app/StudentList'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import Loading from '../../Loading'
import enhancer from './enhancer'
import lesson from 'app/Lesson'
import React from 'react'
import { Link } from 'react-router-dom'
import './Class.less'

const Class = props => {
  const { classId } = props.match.params
  const { isLoaded, classData = {} } = props

  if (!isLoaded) return <Loading />

  return (
    <Layout>
      <Layout.Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: 50
        }}>
        {true ? (
          <NoCourses />
        ) : (
          <span>
            <Collapse
              defaultActiveKey={['active']}
              bordered={false}
              className='lessons-collapse active-lesson'>
              {lesson({ lesson: lessons[0], key: 'active' })}
            </Collapse>
            <Divider style={{ margin: '45px 0px 40px' }}>
              Inactive Lessons
            </Divider>
            <Collapse bordered={false} className='lessons-collapse'>
              {lessons.slice(1).map((val, key) => lesson({ lesson: val, key }))}
            </Collapse>
          </span>
        )}
      </Layout.Content>
      <Layout.Sider width={styles['@sidebar-width']}>
        <StudentList
          students={Object.keys(classData.students || {})}
          addStudentSuccess={props.addStudentSuccess}
          showModal={props.showModal}
          hideModal={props.hideModal}
          isVisible={props.isVisible}
          class={{ ...classData, id: classId }}
          school={classData.school} />
      </Layout.Sider>
    </Layout>
  )
}

Class.propTypes = {}

export default enhancer(Class)

const NoCourses = props => {
  return (
    <EmptyState
      header='Your Class Has No Courses'
      text={
        <span>
          Browse the library of courses <br /> and assign one to your class!
        </span>
      }
      image={backpack}
      btn={
        <Link to='/courses'>
          <Button size='large' className='secondary' type='primary'>
            <Icon type='search' style={{ marginRight: 10 }} />Find A Course
          </Button>
        </Link>
      } />
  )
}

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
