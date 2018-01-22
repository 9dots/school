import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import React from 'react'

import './SchoolDetails.less'

const enhancer = compose(
  firestoreConnect(props => [
    {
      collection: 'schools',
      doc: props.school,
      storeAs: props.school
    }
  ]),
  connect(({ firestore: { data } }, props) => ({
    schoolInfo: data[props.school] || {}
  }))
)

const SchoolDetails = ({ school, schoolInfo: { displayName } }) => {
  return <div>{displayName}</div>
}

SchoolDetails.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(SchoolDetails)
