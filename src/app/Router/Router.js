import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LessonStudentView from '../LessonStudentView'
import AppLayout from '../AppLayout'
import Onboarding from '../Onboarding'
import PropTypes from 'prop-types'
import Courses from 'app/Courses'
import CourseView from 'app/CourseView'
import School from 'app/School'
import Splash from '../Splash'
import Home from 'app/Home'
import React from 'react'
import {
  userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir,
  userHasSchool
} from '../../auth'

import './Router.less'

const App = props => (
  <div>
    <AppLayout {...props}>
      <Switch>
        <Route
          exact
          path='/class/:classId/lesson/:lessonId/:taskNum'
          render={matchProp => (
            <LessonStudentView
              {...matchProp}
              key={
                matchProp.match.params.lessonId + matchProp.match.params.taskNum
              } />
          )} />
        <Route
          exact
          path='/class/:classId/lesson/:lessonId/'
          component={LessonStudentView} />
        <Route exact path='/class/:classId' component={School} />
        <Route exact path='/class' component={School} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/courses/:courseId' component={CourseView} />

        <Route exact path='/' component={Home} />
      </Switch>
    </AppLayout>
  </div>
)

const routes = (
  <Switch>
    <Route path='/login' component={userIsNotAuthenticatedRedir(Splash)} />
    <Route
      path='/onboarding/class'
      component={userIsAuthenticatedRedir(Onboarding)} />
    <Route
      path='/onboarding'
      component={userIsAuthenticatedRedir(Onboarding)} />
    <Route path='/' component={userIsAuthenticatedRedir(userHasSchool(App))} />
  </Switch>
)

const Router = props => <BrowserRouter>{routes}</BrowserRouter>

export default Router
export { routes }
