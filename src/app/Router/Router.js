import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LessonStudentView from '../LessonStudentView'
import CourseEditor from 'app/CourseEditor'
import CourseView from 'app/CourseView'
import Onboarding from '../Onboarding'
import AppLayout from '../AppLayout'
import PropTypes from 'prop-types'
import Courses from 'app/Courses'
import Library from 'app/Library'
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
    <Switch>
      <Route exact path='/courses/:courseId/edit' component={CourseEditor} />
      <AppLayout {...props}>
        <Switch>
          <Route path='/class/:classId' component={School} />
          <Route exact path='/class' component={School} />
          <Route exact path='/library' component={Library} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/analytics' component={Courses} />
          <Route exact path='/courses/:courseId' component={CourseView} />
          <Route exact path='/' component={Home} />
        </Switch>
      </AppLayout>
    </Switch>
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

const Router = props => (
  <BrowserRouter history={props.history}>{routes}</BrowserRouter>
)

export default Router
export { routes }
