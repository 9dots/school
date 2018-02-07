import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TeacherLayout from './TeacherLayout'
import Onboarding from '../Onboarding'
import Courses from 'app/Courses'
import Course from 'app/Course'
import School from 'app/School'
import Splash from '../Splash'
import Home from 'app/Home'
import React from 'react'
import {
  userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir,
  userHasNoSchool,
  userHasSchool
} from '../../auth'

import './Router.less'

const App = props => (
  <div>
    <TeacherLayout>
      <Switch>
        <Route exact path='/school/:school/class/:classId' component={School} />
        <Route exact path='/school/:school' component={School} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/courses/:courseId' component={Course} />
        <Route exact path='/' component={Home} />
      </Switch>
    </TeacherLayout>
  </div>
)

const routes = (
  <div>
    <Route
      path='/login'
      exact
      component={userIsNotAuthenticatedRedir(Splash)} />
    <Route path='/onboarding' exact component={userHasNoSchool(Onboarding)} />
    <Route path='/' component={userIsAuthenticatedRedir(userHasSchool(App))} />
  </div>
)

const Router = props => <BrowserRouter>{routes}</BrowserRouter>

export default Router
