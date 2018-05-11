import StepModal from '../../../components/StepModal'
import CreateClassModal from './CreateClassModal'
import JoinClassModal from './JoinClassModal'
import PropTypes from 'prop-types'
import React from 'react'
import './ClassModal.less'

const ClassModal = props => {
  return <StepModal {...props} modals={[JoinClassModal, CreateClassModal]} />
}

ClassModal.propTypes = {}

export default ClassModal
