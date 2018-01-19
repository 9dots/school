import { firestoreConnect } from 'react-redux-firebase'
import StudentList from 'app/StudentList'
import React, { Component } from 'react'
import { Collapse, Layout } from 'antd'
import styles from 'theme/vars/vars.js'
import ClassList from './ClassList'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import lesson from 'app/Lesson'
import './Classes.less'

const enhancer = compose(
  connect(({ firebase: { auth, profile } }) => ({
    profile
  })),
  firestoreConnect(props => [
    {
      collection: 'schools',
      doc: props.profile.currentSchool,
      storeAs: 'currentSchool'
    }
  ]),
  connect(({ firestore: { data: { currentSchool = {} } } }, props) => ({
    currentSchool: { ...currentSchool, id: props.profile.currentSchool }
  }))
)

class Classes extends Component {
  render () {
    const { currentSchool } = this.props
    return (
      <Layout>
        <Layout.Sider width={styles['@sidebar-width']}>
          <ClassList currentSchool={currentSchool} />
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

export default enhancer(Classes)

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
