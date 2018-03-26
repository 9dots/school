import { Route, Switch } from 'react-router-dom'
import StudentHeader from '../Header/StudentHeader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import mapValues from '@f/map-values'
import Header from '../Header'

class AppLayout extends Component {
  render () {
    const { children, ...rest } = this.props

    const roles = mapValues(role => role, this.props.profile.schools)
    const isTeacher = roles.indexOf('teacher') > -1

    return (
      <div>
        <Switch>
          <Route
            path='/class/:classId/lesson/:lessonId/:taskNum'
            render={({ match: { params } }) => <span />} />
          <Route
            exact
            path='/class/:classId'
            render={({ match: { params } }) =>
              isTeacher ? (
                <Header {...rest} {...params} />
              ) : (
                <StudentHeader {...rest} {...params} />
              )
            } />
          <Route path='*' render={() => <Header isLoaded {...rest} />} />
        </Switch>
        {children}
      </div>
    )
  }
}

AppLayout.propTypes = {}

export default enhancer(AppLayout)
