import { compose, withHandlers } from 'recompose'
import getConfig from '../../getConfig'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import picker from 'google-picker'
import { rpc } from 'app/actions'
import React from 'react'
const config = getConfig()

const pick = picker({
  clientId: config.clientId,
  apiKey: config.apiKey
})

const enhancer = compose(
  connect(
    null,
    { rpc }
  ),
  withHandlers({
    handleClick: props => () => {
      pick(
        {
          views: [
            'DocsView().setIncludeFolders(true).setOwnedByMe(true)',
            'DocsView().setIncludeFolders(true).setEnableTeamDrives(true)'
          ],
          features: ['SUPPORT_TEAM_DRIVES']
        },
        function (err, files) {
          if (err) throw err
          return props.onSelect(files)
        }
      )
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
