import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TeacherLayout from './TeacherLayout'
import Onboarding from '../Onboarding'
import PropTypes from 'prop-types'
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
