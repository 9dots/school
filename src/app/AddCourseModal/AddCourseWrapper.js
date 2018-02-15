import AddCourseModal from 'app/AddCourseModal'
import AddSuccessModal from 'app/AddCourseModal/AddSuccessModal'
import React from 'react'

const AddCourseWrapper = ({ modal, id, name }) => {
  const successId = 'success-' + name

  return (
    <span>
      {modal.isVisible(id) && (
        <AddCourseModal
          id={id}
          courseId={id}
          onOk={modal.hideModal(name)}
          onCancel={modal.hideModal(name)}
          visible />
      )}
      {modal.isVisible(successId) && (
        <AddSuccessModal
          {...modal.getProps(successId)}
          onCancel={modal.hideModal(successId)}
          onOk={modal.hideModal(successId)}
          visible />
      )}
    </span>
  )
}

export default AddCourseWrapper
