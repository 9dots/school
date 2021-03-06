import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import CourseEditor from 'app/CourseEditor'
import AuthHandler from 'app/AuthHandler'
import SchoolLogin from '../SchoolLogin'
import CourseView from 'app/CourseView'
import HomeLayout from 'app/HomeLayout'
import Modals from 'components/Modals'
import Onboarding from '../Onboarding'
import AppLayout from '../AppLayout'
import PropTypes from 'prop-types'
import Courses from 'app/Courses'
import Privacy from 'app/Privacy'
import Library from 'app/Library'
import School from 'app/School'
import Terms from '../Terms'
import Home from 'app/Home'
import React from 'react'
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticated,
  userIsAuthenticated,
  userHasSchool,
  agreedToTerms,
  splashRedir
} from '../../auth'

import './Router.less'

const App = props => {
  const {
    match: {
      params: { route }
    }
  } = props

  return (
    <div>
      <Switch>
        <Route exact path='/course/:courseId/edit' component={CourseEditor} />
        <AppLayout showSidebar={route !== 'school'} {...props}>
          <Switch>
            <Route path='/class/:classId?' component={School} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/analytics' component={Courses} />
            <Route exact path='/courses/:courseId' component={CourseView} />
            <Route
              path='/school/:schoolId/:classId?'
              component={SchoolLogin}
              exact />
            <Route exact path='/' component={Home} />
            <Redirect to='/' />
          </Switch>
        </AppLayout>
      </Switch>
    </div>
  )
}

const HomeRoutes = ({
  match: {
    params: { route }
  }
}) => (
  <HomeLayout allowSignIn={route !== 'school'}>
    <Switch>
      <Redirect exact path='/' to='/courses' />
      <Route exact path='/school/:schoolId/:classId?' component={SchoolLogin} />
      <Route exact path='/courses' render={() => <Courses header={false} />} />
      <Route
        exact
        path='/courses/:courseId'
        render={props => <CourseView {...props} header={false} />} />
    </Switch>
  </HomeLayout>
)

const routes = (
  <span>
    <Switch>
      <Route path='/authhandler' component={AuthHandler} />
      <Route exact path='/privacy' component={Privacy} />
      <Route path='/terms' component={userIsAuthenticatedRedir(Terms)} />
      <Route
        path='/onboarding'
        component={userIsAuthenticatedRedir(Onboarding)} />
      <Route path='/'>
        <div>
          <Switch>
            <Route
              path='/:route(courses|school)'
              component={userIsNotAuthenticated(HomeRoutes)} />
            <Route
              path='/'
              component={userIsNotAuthenticated(splashRedir(HomeRoutes))} />
          </Switch>
          <Route
            path='/:route?'
            component={userIsAuthenticated(agreedToTerms(userHasSchool(App)))} />
        </div>
      </Route>
    </Switch>
    <Modals />
  </span>
)

const Router = props => (
  <BrowserRouter history={props.history}>{routes}</BrowserRouter>
)

export default Router
export { routes }
