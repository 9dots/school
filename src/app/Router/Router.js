import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  userIsNotAuthenticatedRedir,
  userIsAuthenticatedRedir,
  userHasNoSchool,
  userHasSchool
} from '../../auth'
import TeacherLayout from './TeacherLayout'
import Onboarding from '../Onboarding'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import Classes from 'app/Classes'
import Splash from '../Splash'
import React from 'react'
import './Router.less'

const enhance = compose(
  connect(({ firebase: { auth, profile } }) => ({
    profile
  }))
)

const Router = enhance(props => {
  return (
    <BrowserRouter>
      <div>
        <Route
          path='/login'
          exact
          component={userIsNotAuthenticatedRedir(Splash)} />
        <Route
          path='/onboarding'
          exact
          component={userHasNoSchool(Onboarding)} />
        <Route
          path='/'
          component={userIsAuthenticatedRedir(userHasSchool(App))} />
      </div>
    </BrowserRouter>
  )
})

const App = props => (
  <div>
    <TeacherLayout>
      <Switch>
        <Route path='/class/:classId' component={Classes} />
        <Route path='/' component={Classes} />
      </Switch>
    </TeacherLayout>
  </div>
)

Router.propTypes = {}

export default Router
