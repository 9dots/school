import AddStudentModal from 'app/StudentList/AddStudentModal'
import CreateStudentModal from 'app/CreateStudentModal'
import StepModal from 'components/StepModal'
import PropTypes from 'prop-types'
import React from 'react'

import './StudentModal.less'

const StudentModal = props => {
  return <StepModal {...props} modals={[AddStudentModal, CreateStudentModal]} />
}

StudentModal.propTypes = {}

export default StudentModal
