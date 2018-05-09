import { compose, withHandlers, withStateHandlers, withProps } from 'recompose'
import modalContainer from 'components/modalContainer'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { rpc } from 'app/actions'
import React from 'react'

export default compose(
  modalContainer,
  connect(() => ({}), { rpc }),
  withStateHandlers(
    {
      selectedStudents: [],
      isSelected: false,
      openDropdown: undefined,
      resettingPassword: false
    },
    {
      setOpenDropdown: () => (visible, s) => ({
        openDropdown: visible ? s : undefined
      }),
      setSelectedStudents: () => (ids, selectedStudents) => ({
        selectedStudents,
        isSelected: !!selectedStudents.length
      }),
      setResetting: () => resettingPassword => ({ resettingPassword })
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
        content: (
          <span>
            The following students will be removed from your class: <br />
            <span>
              {students.map(student => (
                <b key={student.id}>
                  {student.displayName}
                  <br />
                </b>
              ))}
            </span>
          </span>
        ),
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
    const resetPassword = props => async student => {
      Modal.confirm({
        title: 'Change password?',
        content: (
          <span>
            This will change the password for <b>{student.displayName}</b>.
          </span>
        ),
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            props.setResetting(true)
            await props.rpc('user.setInsecurePassword', {
              user: student.id,
              type: props.classData.passwordType
            })
          } catch (e) {
            message.error(e.error)
          }
          props.setResetting(false)
        }
      })
    }
    return {
      printPasswords: ({ modal, classData, selectedStudents }) => {
        return modal.showModal({
          name: 'printPasswords',
          students: selectedStudents,
          passwordType: classData.passwordType
        })
      },
      setPasswordType: props => async key => {
        try {
          props.setResetting(true)
          await props.rpc('class.setPasswordType', {
            class: props.class,
            passwordType: key
          })
        } catch (e) {
          message.error(e.error)
        }
        props.setResetting(false)
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
            return resetPassword(props)(student)
        }
      },
      removeStudents,
      resetPassword
    }
  })
)
