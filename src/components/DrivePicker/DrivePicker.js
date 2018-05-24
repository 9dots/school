import { compose, withHandlers } from 'recompose'
import getConfig from '../../getConfig'
import PropTypes from 'prop-types'
import picker from 'google-picker'
import React from 'react'
const config = getConfig()

const pick = picker({
  clientId: config.clientId,
  apiKey: config.apiKey
})

const enhancer = compose(
  withHandlers({
    handleClick: props => e => {
      pick({ views: ['DocsView()'] }, function (err, files) {
        if (err) throw err
        return props.onSelect(files)
      })
    }
  })
)

const DrivePicker = props => {
  return React.cloneElement(props.component, {
    onClick: props.handleClick
  })
}

DrivePicker.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default enhancer(DrivePicker)
