import LessonStudentView from '../../../LessonStudentView'
import backpack from 'assets/images/emptypack.png'
import { Switch, Route } from 'react-router-dom'
import { Layout, Divider } from 'antd'
import EmptyState from 'app/EmptyState'
import StartLesson from './StartLesson'
import Modules from '../Modules'
import PropTypes from 'prop-types'
import React from 'react'
import './StudentClass.less'
import Loading from '../../../Loading/Loading'

const StudentClass = props => {
  const { classData = {}, progressByStudent, onAssign, auth } = props
  const { classId } = props.match.params
  const { assignedLesson } = classData

  const modules = Object.keys(classData.modules || {})

  const classView = (
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
              <StartLesson
                uid={auth.uid}
                classId={classId}
                assignedLesson={assignedLesson} />
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

  return (
    <Switch>
      <Route
        exact
        path='/class/:classId/lesson/:lessonId/:taskNum'
        render={matchProp =>
          progressByStudent[auth.uid] &&
          progressByStudent[auth.uid].progress ? (
              <LessonStudentView
                {...matchProp}
                assignedLesson={assignedLesson}
                progress={progressByStudent[auth.uid].progress}
                key={
                  matchProp.match.params.lessonId + matchProp.match.params.taskNum
                } />
            ) : (
              <Loading />
            )
        } />
      <Route exact path='/class/:classId' render={() => classView} />
    </Switch>
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
