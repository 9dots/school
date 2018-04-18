import CreateStudentModal from 'app/CreateStudentModal'
import modalContainer from 'components/modalContainer'
import PropTypes from 'prop-types'
import React from 'react'
import './Modals.less'

const Modals = ({ modal }) => {
  return (
    <div>
      {modal.isVisible('createStudent') && (
        <CreateStudentModal visible {...modal.getProps('createStudent')} />
      )}
    </div>
  )
}

Modals.propTypes = {}

export default modalContainer(Modals)
