import { compose, withHandlers, withStateHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import modalContainer from '../../../components/modalContainer'
import { rpc } from 'app/actions'

export default compose(
  modalContainer,
  connect(() => ({}), { rpc }),
  withStateHandlers(
    {
      selectedStudents: [],
      isSelected: false,
      openDropdown: undefined
    },
    {
      setOpenDropdown: () => (visible, s) => ({
        openDropdown: visible ? s : undefined
      }),
      setSelectedStudents: () => (ids, selectedStudents) => ({
        selectedStudents,
        isSelected: !!selectedStudents.length
      })
    }
  ),
  withProps(props => ({
    tableConfig: {
      onChange: props.setSelectedStudents
    }
  })),
  withHandlers(props => {
    const removeStudents = props => students => {
      Modal.confirm({
        title: 'Remove students?',
        content: `The following students will be removed from your class:\n\n ${students
          .map(student => student.displayName)
          .join(', ')}`,
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('class.removeStudents', {
              class: props.class,
              students: students.map(student => student.id)
            })
            message.success('Students Removed')
          } catch (e) {
            message.error(e.error)
          }
        }
      })
    }
    return {
      printPasswords: ({ modal, selectedStudents }) => {
        return modal.showModal({
          name: 'printPasswords',
          students: selectedStudents
        })
      },
      setPasswordType: props => async key => {
        try {
          await props.rpc('class.setPasswordType', {
            class: props.class,
            passwordType: key
          })
        } catch (e) {
          message.error(e.error)
        }
      },
      addStudent: ({ modal, classData }) => {
        return modal.showModal({
          name: 'createStudent',
          school: classData.school,
          class: classData,
          onOk: modal.hideModal('createStudent'),
          onCancel: modal.hideModal('createStudent')
        })
      },
      studentMenuClick: props => (key, student) => {
        props.setOpenDropdown(false)
        switch (key) {
          case 'remove':
            return removeStudents(props)([student])
          case 'resetPassword':
            return console.log('reset')
        }
      },
      removeStudents
    }
  })
)
