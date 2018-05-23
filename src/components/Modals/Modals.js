import modalContainer from 'components/modalContainer'
import StudentCsvUpload from 'app/StudentCsvUpload'
import LoginModal from 'app/LoginModal/LoginModal'
import ClassModal from 'app/School/ClassModal'
import StudentModal from 'app/StudentModal'
import PropTypes from 'prop-types'
import React from 'react'
import './Modals.less'

const Modals = ({ modal }) => {
  return (
    <div>
      {modal.isVisible('loginModal') && (
        <LoginModal
          onCancel={modal.hideModal('loginModal')}
          onOk={modal.hideModal('loginModal')}
          {...modal.getProps('classModal')} />
      )}
      {modal.isVisible('createStudent') && (
        <StudentModal
          onCancel={modal.hideModal('createStudent')}
          onOk={modal.hideModal('createStudent')}
          {...modal.getProps('createStudent')} />
      )}

      {modal.isVisible('classModal') && (
        <ClassModal
          visible
          onCancel={modal.hideModal('classModal')}
          onOk={modal.hideModal('classModal')}
          {...modal.getProps('classModal')} />
      )}
      {modal.isVisible('studentCsvModal') && (
        <StudentCsvUpload
          onCancel={modal.hideModal('studentCsvModal')}
          onOk={modal.hideModal('studentCsvModal')}
          {...modal.getProps('studentCsvModal')} />
      )}
    </div>
  )
}

Modals.propTypes = {}

export default modalContainer(Modals)
