import { firestoreConnect } from 'react-redux-firebase'
import { moduleSelector } from '../../../../selectors'
import { connect } from 'react-redux'
import Course from '../../../Course'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import './Modules.less'

const enhancer = compose(
  firestoreConnect(props =>
    props.modules.map(module => ({
      collection: 'modules',
      doc: module,
      storeAs: module
    }))
  ),
  connect((state, props) => ({
    mods: moduleSelector(state, props.modules)
  }))
)

const Modules = props => {
  return (
    <span>
      {props.mods.map(
        module => module && <Course key={module.id} added course={module} />
      )}
    </span>
  )
}

Modules.propTypes = {}

export default enhancer(Modules)
