import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './Home.less'

const Home = props =>
  props.isLoaded ? <Redirect to={`/class/${getRedirect(props)}`} /> : <div />

function getRedirect ({ nav }) {
  return nav || ''
}

Home.propTypes = {
  nav: PropTypes.string,
  profile: PropTypes.object
}

export default enhancer(Home)
