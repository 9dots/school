import ClassSettingsModal from 'app/ClassSettingsModal'
import { Link, Switch, Route } from 'react-router-dom'
import modalContainer from 'components/modalContainer'
import LessonStudentView from 'app/LessonStudentView'
import { Layout, Divider, Icon, Button } from 'antd'
import backpack from 'assets/images/emptypack.png'
import NoActiveLesson from '../NoActiveLesson'
import ActiveLesson from '../ActiveLesson'
import StudentList from 'app/StudentList'
import EmptyState from 'app/EmptyState'
import styles from 'theme/vars/vars.js'
import PropTypes from 'prop-types'
import Loading from 'app/Loading'
import Modules from '../Modules'
import React from 'react'

import './TeacherClass.less'

const TeacherClass = props => {
  const { progressByStudent, assignedLesson } = props

  return (
    <Switch>
      <Route
        exact
        path='/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum/:uid'
        render={routeProps =>
          progressByStudent[routeProps.match.params.uid] &&
          progressByStudent[routeProps.match.params.uid].progress ? (
              <LessonStudentView
                {...routeProps}
                teacherView
                uid={routeProps.match.params.uid}
                // progress={progressByStudent[routeProps.match.params.uid].progress}
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
      <Route
        exact
        path='/class/:classId'
        render={() => <ClassView {...props} />} />
    </Switch>
  )
}

TeacherClass.propTypes = {}

export default modalContainer(TeacherClass)

const ClassView = props => {
  const {
    progressByStudent,
    assignedLesson,
    activeByTask,
    classData = {},
    studentData,
    onAssign,
    modal
  } = props

  const { classId } = props.match.params

  const mods = classData.modules || {}
  const modules = Object.keys(mods).sort(
    (modA, modB) => mods[modA].ts > mods[modB].ts
  )

  const students = Object.keys(classData.students || {})

  return (
    <Layout className='class'>
      <Layout.Header style={{ lineHeight: '20px', padding: '10px 50px' }}>
        <h2 className='ellipsis' style={{ marginBottom: 6, maxWidth: 400 }}>
          {classData.displayName}
        </h2>
        <div style={{ fontSize: '12px' }}>
          {students.length} Student{students.length !== 1 ? 's' : ''}&ensp;|&ensp;
          <span
            onClick={modal.showModal('classSettingsModal')}
            style={{ cursor: 'pointer' }}>
            <Icon type='setting' />&ensp;Class Settings
          </span>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Content
          style={{
            minHeight: 'calc(100vh - 64px)',
            padding: '30px 50px 50px'
          }}>
          {!modules.length ? (
            <NoCourses onAssign={onAssign} />
          ) : (
            <div className='main-col' style={{ padding: 0 }}>
              {!assignedLesson ? (
                <NoActiveLesson modules={modules} onAssign={onAssign} />
              ) : (
                <span>
                  <Divider style={{ margin: '20px 0px 20px' }}>
                    Active Lesson
                  </Divider>
                  <ActiveLesson
                    activeByTask={activeByTask}
                    lesson={assignedLesson}
                    studentProgress={progressByStudent}
                    id='active' />
                </span>
              )}
              <Divider style={{ margin: '45px 0px 40px' }}>Courses</Divider>
              <Modules
                onAssign={onAssign}
                classId={classId}
                progress={progressByStudent}
                assignedLesson={assignedLesson}
                modules={modules} />
            </div>
          )}
          {/* <Route
            path={`/class/:classId/settings`}
            render={() => (
              <ClassSettingsModal
                visible
                classData={{ id: classId, ...classData }}
                students={studentData}
                onOk={modal.hideModal('classSettingsModal')}
                onCancel={modal.hideModal('classSettingsModal')} />
            )} /> */}

          {modal.isVisible('classSettingsModal') && (
            <ClassSettingsModal
              visible
              {...modal.getProps('classSettingsModal')}
              class={classId}
              classData={classData}
              students={studentData}
              onOk={modal.hideModal('classSettingsModal')}
              onCancel={modal.hideModal('classSettingsModal')} />
          )}
        </Layout.Content>

        <Layout.Sider
          width={styles['@sidebar-width']}
          style={{
            minHeight: 'calc(100vh - 62px)',
            borderLeft: '1px solid #e8e8e8'
          }}>
          <StudentList
            studentData={studentData}
            tasks={(assignedLesson || {}).tasks}
            moduleId={(assignedLesson || {}).module}
            progressByStudent={progressByStudent}
            students={students}
            addStudentSuccess={props.addStudentSuccess}
            modal={props.modal}
            class={{ ...classData, id: classId }}
            school={classData.school} />
        </Layout.Sider>
      </Layout>
    </Layout>
  )
}

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
