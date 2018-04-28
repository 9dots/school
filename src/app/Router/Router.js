import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import CourseEditor from 'app/CourseEditor'
import SchoolLogin from '../SchoolLogin'
import CourseView from 'app/CourseView'
import HomeLayout from 'app/HomeLayout'
import Modals from 'components/Modals'
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
  // userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir,
  userIsNotAuthenticated,
  userIsAuthenticated,
  userHasSchool
} from '../../auth'

import './Router.less'

const App = props => (
  <div>
    <Switch>
      <Route exact path='/courses/:courseId/edit' component={CourseEditor} />
      <AppLayout {...props}>
        <Switch>
          <Route path='/class/:classId?' component={School} />
          <Route exact path='/library' component={Library} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/analytics' component={Courses} />
          <Route exact path='/courses/:courseId' component={CourseView} />
          <Route exact path='/' component={Home} />
        </Switch>
      </AppLayout>
    </Switch>
    <Modals />
  </div>
)

const HomeRoutes = prop => (
  <HomeLayout>
    <Switch>
      <Redirect exact path='/' to='/courses' />
      <Route exact path='/school/:schoolId/:classId?' component={SchoolLogin} />
      <Route exact path='/courses' render={() => <Courses header={false} />} />
      <Route exact path='/courses/:courseId' component={CourseView} />
    </Switch>
  </HomeLayout>
)

const routes = (
  <Switch>
    <Route
      path='/onboarding'
      component={userIsAuthenticatedRedir(Onboarding)} />
    <Route path='/'>
      <div>
        <Route path='/' component={userIsAuthenticated(userHasSchool(App))} />
        <Route path='/' component={userIsNotAuthenticated(HomeRoutes)} />
      </div>
    </Route>
  </Switch>
)

const Router = props => (
  <BrowserRouter history={props.history}>{routes}</BrowserRouter>
)

export default Router
export { routes }
