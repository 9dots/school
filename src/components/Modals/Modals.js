import AddStudentModal from 'app/StudentList/AddStudentModal'
import CreateStudentModal from 'app/CreateStudentModal'
import modalContainer from 'components/modalContainer'
import StepModal from 'components/StepModal'
import PropTypes from 'prop-types'
import React from 'react'
import './Modals.less'

const Modals = ({ modal }) => {
  return (
    <div>
      {modal.isVisible('createStudent') && (
        <StepModal
          modals={[
            {
              modal: AddStudentModal,
              props: modal.getProps('createStudent')
            },
            {
              modal: CreateStudentModal,
              props: modal.getProps('createStudent')
            }
          ]} />
      )}
    </div>
  )
}

Modals.propTypes = {}

export default modalContainer(Modals)
