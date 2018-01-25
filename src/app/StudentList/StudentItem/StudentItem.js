import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import React from 'react'
import './StudentItem.less'

const enhancer = compose(
  firestoreConnect(props => [
    {
      collection: 'users',
      doc: props.uid,
      storeAs: props.uid
    }
  ]),
  connect(({ firestore: { data } }, props) => ({
    user: data[props.uid]
  }))
)

const StudentItem = props => {
  const { user = {} } = props
  return <div>{user.displayName}</div>
}

StudentItem.propTypes = {}

export default enhancer(StudentItem)
