import AddStudentModal from 'app/StudentList/AddStudentModal'
import ClassModal from 'app/School/ClassModal'
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

      {modal.isVisible('classModal') && (
        <ClassModal
          visible
          onCancel={modal.hideModal('classModal')}
          onOk={modal.hideModal('classModal')}
          {...modal.getProps('classModal')} />
      )}
    </div>
  )
}

Modals.propTypes = {}

export default modalContainer(Modals)
