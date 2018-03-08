import AddCourseModal from 'app/AddCourseModal'
import AddSuccessModal from 'app/AddCourseModal/AddSuccessModal'
import React from 'react'

const AddCourseWrapper = ({ modal, id, name, displayName }) => {
  const successId = 'success-' + name

  return (
    <span>
      {modal.isVisible(id) && (
        <AddCourseModal
          id={id}
          courseId={id}
          displayName={displayName}
          onOk={modal.hideModal(name)}
          onCancel={modal.hideModal(name)}
          visible />
      )}
      {modal.isVisible(successId) && (
        <AddSuccessModal
          {...modal.getProps(successId)}
          displayName={displayName}
          onCancel={modal.hideModal(successId)}
          onOk={modal.hideModal(successId)}
          visible />
      )}
    </span>
  )
}

export default AddCourseWrapper
