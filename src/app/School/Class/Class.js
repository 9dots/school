import { Collapse, Layout, Divider, Icon, Button } from 'antd'
import backpack from 'assets/images/emptypack.png'
import StudentList from 'app/StudentList'
import { Link } from 'react-router-dom'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import Loading from '../../Loading'
import enhancer from './enhancer'
import Modules from './Modules'
import Lesson from 'app/Lesson'
import React from 'react'
import './Class.less'

const Class = props => {
  const { isLoaded, classData = {} } = props
  const { classId } = props.match.params
  const { assignedLesson } = classData

  const modules = Object.keys(classData.modules || {})

  if (!isLoaded) return <Loading />

  return (
    <Layout>
      <Layout.Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: '30px 50px 50px'
        }}>
        {!modules.length ? (
          <NoCourses />
        ) : (
          <div className='main-col'>
            <h2>{classData.displayName}</h2>
            {!assignedLesson ? (
              <NoActive />
            ) : (
              <Lesson lesson={assignedLesson} id='active' />
            )}
            <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
            <Modules classId={classId} modules={modules} />
          </div>
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

const NoActive = props => (
  <div className='no-active-lesson'>
    <h2>No Active Lesson</h2>
    <p>Click the button below to start the next course for your class.</p>
    <Button
      type='primary'
      className='secondary'
      size='large'
      style={{ padding: '0 35px' }}>
      Start!
    </Button>
  </div>
)

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
