import LessonStudentView from '../../../LessonStudentView'
import { Link, Switch, Route } from 'react-router-dom'
import { Layout, Divider, Icon, Button } from 'antd'
import backpack from 'assets/images/emptypack.png'
import NoActiveLesson from '../NoActiveLesson'
import ActiveLesson from '../ActiveLesson'
import StudentList from 'app/StudentList'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import Loading from '../../../Loading'
import PropTypes from 'prop-types'
import Modules from '../Modules'
import React from 'react'
import './TeacherClass.less'

const TeacherClass = props => {
  const { progressByStudent, classData = {}, studentData, onAssign } = props
  const { classId } = props.match.params
  const { assignedLesson } = classData

  const modules = Object.keys(classData.modules || {})
  const students = Object.keys(classData.students || {})

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
              <NoActiveLesson modules={modules} onAssign={onAssign} />
            ) : (
              <span>
                <Divider style={{ margin: '35px 0px 20px' }}>
                  Active Lesson
                </Divider>
                <ActiveLesson
                  lesson={assignedLesson}
                  studentProgress={progressByStudent}
                  id='active' />
              </span>
            )}
            <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
            <Modules
              onAssign={onAssign}
              classId={classId}
              assignedLesson={assignedLesson}
              modules={modules} />
          </div>
        )}
      </Layout.Content>

      <Layout.Sider width={styles['@sidebar-width']}>
        <StudentList
          studentData={studentData}
          tasks={(assignedLesson || {}).tasks}
          progressByStudent={progressByStudent}
          students={students}
          addStudentSuccess={props.addStudentSuccess}
          showModal={props.showModal}
          hideModal={props.hideModal}
          isVisible={props.isVisible}
          class={{ ...classData, id: classId }}
          school={classData.school} />
      </Layout.Sider>
    </Layout>
  )
  return (
    <Switch>
      <Route
        exact
        path='/class/:classId/lesson/:lessonId/:taskNum/:uid'
        render={routeProps =>
          progressByStudent[routeProps.match.params.uid] &&
          progressByStudent[routeProps.match.params.uid].progress ? (
              <LessonStudentView
                {...routeProps}
                teacherView
                progress={progressByStudent[routeProps.match.params.uid].progress}
                assignedLesson={assignedLesson}
                profile={progressByStudent[routeProps.match.params.uid].student}
                key={
                  routeProps.match.params.lessonId +
                routeProps.match.params.taskNum
                } />
            ) : (
              <Loading />
            )
        } />
      <Route exact path='/class/:classId' render={() => classView} />
    </Switch>
  )
}

TeacherClass.propTypes = {}

export default TeacherClass

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
