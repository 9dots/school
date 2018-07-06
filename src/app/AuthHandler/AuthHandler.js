import { signInWithCredential } from 'ducks/login'
import URLSearchParams from 'url-search-params'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from 'app/Loading'
import React from 'react'
import './AuthHandler.less'

class AuthHandler extends React.PureComponent {
  constructor (props) {
    super(props)
    const searchParams = new URLSearchParams(props.location.search)
    const token = searchParams.get('token')
    props.signInWithCredential(token)
  }
  render () {
    return <Loading />
  }
}

AuthHandler.propTypes = {}

export default connect(
  null,
  { signInWithCredential }
)(AuthHandler)
