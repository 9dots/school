import AddCourseModal from 'app/AddCourseModal'
import AddSuccessModal from 'app/AddCourseModal/AddSuccessModal'
import React from 'react'

const AddCourseWrapper = ({ modal, id }) => {
  const successId = 'success-' + (id || 'modal')

  return (
    <span>
      {modal.isVisible(id) && (
        <AddCourseModal
          id={id}
          courseId={id}
          onOk={modal.hideModal(id)}
          onCancel={modal.hideModal(id)}
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
