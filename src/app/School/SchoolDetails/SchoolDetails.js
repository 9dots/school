import waitFor from '../../../components/waitFor/waitFor'
import { firestoreConnect } from 'react-redux-firebase'
import { school } from '../../../selectors'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
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
  connect((state, props) => ({
    schoolInfo: school(state, props.school)
  })),
  waitFor(['schoolInfo'])
)

const SchoolDetails = ({ isLoaded, schoolInfo, style }) => {
  if (!isLoaded) return <div />
  return <span style={style}>{schoolInfo.displayName || 'Loading…'}</span>
}

SchoolDetails.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(SchoolDetails)
