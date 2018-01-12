import { BrowserRouter, Route } from 'react-router-dom'
import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir
} from '../../auth'
import TeacherLayout from './TeacherLayout'
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
        <Route path='/' exact component={userIsAuthenticatedRedir(App)} />
      </div>
    </BrowserRouter>
  )
})

const App = props => (
  <div>
    <TeacherLayout>
      <Route path='/' component={Classes} />
    </TeacherLayout>
  </div>
)

Router.propTypes = {}

export default Router
