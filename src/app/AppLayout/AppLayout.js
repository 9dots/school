import { Route, Switch } from 'react-router-dom'
import ClassHeader from '../Header/ClassHeader'
import LessonHeader from '../Header/LessonHeader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Header from '../Header'

class AppLayout extends Component {
  render () {
    const { children, ...rest } = this.props

    return (
      <div>
        <Switch>
          <Route
            exact
            path='/class/:classId/lesson/:lessonId/:taskNum'
            render={({ match: { params } }) => (
              <LessonHeader {...rest} {...params} />
            )} />
          <Route
            exact
            path='/class/:classId'
            render={({ match: { params } }) => (
              <ClassHeader {...rest} {...params} />
            )} />
          <Route path='*' render={() => <Header isLoaded {...rest} />} />
        </Switch>
        {children}
      </div>
    )
  }
}

AppLayout.propTypes = {}

export default enhancer(AppLayout)
