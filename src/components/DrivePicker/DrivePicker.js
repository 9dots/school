import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import picker from 'google-picker'
import React from 'react'
const pick = picker({
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
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
