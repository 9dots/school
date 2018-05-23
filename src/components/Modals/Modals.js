import PrintPasswords from 'app/ClassSettingsModal/ClassStudentSettings/PrintPasswords'
import CreateStudentModal from 'app/CreateStudentModal'
import modalContainer from 'components/modalContainer'
import StudentCsvUpload from 'app/StudentCsvUpload'
import LoginModal from 'app/LoginModal/LoginModal'
import ClassModal from 'app/School/ClassModal'
import StudentModal from 'app/StudentModal'
import PropTypes from 'prop-types'
import React from 'react'
import './Modals.less'

const Modals = props => {
  return (
    <div>
      <Modal {...props} component={ClassModal} name='classModal' />
      <Modal {...props} component={CreateStudentModal} name='editUser' edit />
      <Modal {...props} component={LoginModal} name='loginModal' />
      <Modal {...props} component={StudentModal} name='createStudent' />
      <Modal {...props} component={PrintPasswords} name='printPasswords' />
      <Modal {...props} component={StudentCsvUpload} name='studentCsvUpload' />
    </div>
  )
}

Modals.propTypes = {}

export default modalContainer(Modals)

const Modal = props => {
  const { modal, component: Component, name, ...rest } = props

  return (
    modal.isVisible(name) && (
      <Component
        {...rest}
        visible
        onCancel={modal.hideModal(name)}
        onOk={modal.hideModal(name)}
        {...modal.getProps(name)} />
    )
  )
}
