import LessonStudentView from '../../../LessonStudentView'
import backpack from 'assets/images/emptypack.png'
import { Switch, Route } from 'react-router-dom'
import EmptyState from 'app/EmptyState'
import StartLesson from './StartLesson'
import { Layout, Divider } from 'antd'
import PropTypes from 'prop-types'
import Modules from '../Modules'
import React from 'react'
import './StudentClass.less'

// TODO: make this less terrible

const StudentClass = props => {
  const { classData = {}, progressByStudent, assignToStudent, auth } = props
  const { classId } = props.match.params
  const { assignedLesson } = classData

  const modules = Object.keys(classData.modules || {})

  const classView = (
    <Layout className="class">
      <Layout.Header>
        <h2>{classData.displayName}</h2>
      </Layout.Header>
      <Layout.Content
        style={{
          minHeight: 'calc(100vh - 64px)',
          padding: '30px 50px 50px'
        }}
      >
        {!modules.length ? (
          <NoCourses />
        ) : (
          <div className="main-col" style={{ padding: 0 }}>
            {!assignedLesson ? (
              <div className="no-active-lesson">
                <h2 style={{ lineHeight: '30vh' }}>No Assigned Lessons</h2>
              </div>
            ) : (
              <StartLesson
                uid={auth.uid}
                assignToStudent={assignToStudent}
                classId={classId}
                assignedLesson={assignedLesson}
              />
            )}
            <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
            <Modules
              student={auth.uid}
              assignToStudent={assignToStudent}
              classId={classId}
              progress={progressByStudent}
              assignedLesson={assignedLesson}
              modules={modules}
            />
          </div>
        )}
      </Layout.Content>
    </Layout>
  )
  return (
    <Switch>
      <Route
        exact
        path="/class/:classId/lesson/:lessonId/:taskNum"
        render={matchProp => (
          <LessonStudentView
            {...matchProp}
            progress={(progressByStudent[auth.uid] || {}).progress}
            assignedLesson={assignedLesson}
            key={
              matchProp.match.params.lessonId + matchProp.match.params.taskNum
            }
          />
        )}
      />
      <Route exact path="/class/:classId" render={() => classView} />
    </Switch>
  )
}

StudentClass.propTypes = {}

export default StudentClass

const NoCourses = props => {
  return (
    <EmptyState
      header="Your Class Has No Courses"
      text={
        <span>When your teacher assigns something it will show up here!</span>
      }
      image={backpack}
    />
  )
}
