import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TeacherLayout from './TeacherLayout'
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
    <TeacherLayout {...props}>
      <Switch>
        <Route exact path='/school/:school/class/:classId' component={School} />
        <Route exact path='/school/:school' component={School} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/courses/:courseId' component={CourseView} />
        <Route exact path='/' component={Home} />
      </Switch>
    </TeacherLayout>
  </div>
)

const routes = (
  <Switch>
    <Route path='/login' component={userIsNotAuthenticatedRedir(Splash)} />
    <Route path='/onboarding/class' component={Onboarding} />
    <Route path='/onboarding' component={Onboarding} />
    <Route path='/' component={userIsAuthenticatedRedir(userHasSchool(App))} />
  </Switch>
)

const Router = props => <BrowserRouter>{routes}</BrowserRouter>

export default Router
