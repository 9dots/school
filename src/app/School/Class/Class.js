import { Collapse, Layout, Divider, Icon, Button } from 'antd'
import backpack from 'assets/images/emptypack.png'
import StudentList from 'app/StudentList'
import Modules from './Modules'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import Loading from '../../Loading'
import enhancer from './enhancer'
import lesson from 'app/Lesson'
import React from 'react'
import { Link } from 'react-router-dom'
import './Class.less'

const Class = props => {
  const { isLoaded, classData = {} } = props
  const { classId } = props.match.params

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
            <div className='no-active-lesson'>
              <h2>No Active Lesson</h2>
              <p>
                Click the button below to start the next course for your class.
              </p>
              <Button
                type='primary'
                className='secondary'
                size='large'
                style={{ padding: '0 35px' }}>
                Start!
              </Button>
            </div>
            {/* <Collapse
              defaultActiveKey={['active']}
              bordered={false}
              className='lessons-collapse active-lesson'>
              {lesson({ lesson: lessons[0], key: 'active' })}
            </Collapse> */}
            <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
            <Modules modules={modules} />
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
