import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './Home.less'

const Home = props =>
  props.isLoaded ? <Redirect to={`/school/${getRedirect(props)}`} /> : <div />

function getRedirect ({ nav, profile: { schools } }) {
  if (nav.school) return nav.school
  return Object.keys(schools)[0]
}

Home.propTypes = {
  nav: PropTypes.object,
  profile: PropTypes.object
}

export default enhancer(Home)
