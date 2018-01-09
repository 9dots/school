import { BrowserRouter, Route } from 'react-router-dom'
import TeacherLayout from './TeacherLayout'
import PropTypes from 'prop-types'
import Classes from 'app/Classes'
import React from 'react'
import './Router.less'

const Router = props => {
  return (
    <BrowserRouter>
      <TeacherLayout>
        <Route path='/' component={Classes} />
      </TeacherLayout>
    </BrowserRouter>
  )
}

Router.propTypes = {}

export default Router
