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

<<<<<<< HEAD
const SchoolDetails = props => {
  if (!props.isLoaded) return <span />
  return <span>{props.schoolInfo.displayName}</span>
=======
const SchoolDetails = ({ isLoaded, schoolInfo, style }) => {
  if (!isLoaded) return <div />
  return <span style={style}>{schoolInfo.displayName || 'Loading…'}</span>
>>>>>>> 755a69bf35553d423a4b6263687c81858034d002
}

SchoolDetails.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(SchoolDetails)
