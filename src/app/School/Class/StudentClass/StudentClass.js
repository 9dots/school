import { Layout, Divider } from 'antd'
import backpack from 'assets/images/emptypack.png'
// import { Link } from 'react-router-dom'
import EmptyState from 'app/EmptyState'
// import NoActiveLesson from '../NoActiveLesson'
import StartLesson from './StartLesson'
import Modules from '../Modules'
import PropTypes from 'prop-types'
import React from 'react'
import './StudentClass.less'

const StudentClass = props => {
  const { classData = {}, progressByStudent, onAssign, auth } = props
  const { classId } = props.match.params
  const { assignedLesson } = classData

  const modules = Object.keys(classData.modules || {})

  return (
    <Layout className='class'>
      <Layout.Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: '30px 50px 50px'
        }}>
        {!modules.length ? (
          <NoCourses onAssign={onAssign} />
        ) : (
          <div className='main-col' style={{ padding: 0 }}>
            <h2>{classData.displayName}</h2>
            {!assignedLesson ? (
              <div className='no-active-lesson'>
                <h2 style={{ lineHeight: '30vh' }}>No Assigned Lessons</h2>
              </div>
            ) : (
              <StartLesson classId={classId} lesson={assignedLesson} />
            )}
            <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
            <Modules
              student={auth.uid}
              onAssign={onAssign}
              classId={classId}
              assignedLesson={assignedLesson}
              modules={modules} />
          </div>
        )}
      </Layout.Content>
    </Layout>
  )
}

StudentClass.propTypes = {}

export default StudentClass

const NoCourses = props => {
  return (
    <EmptyState
      header='Your Class Has No Courses'
      text={
        <span>When your teacher assigns something it will show up here!</span>
      }
      image={backpack} />
  )
}
