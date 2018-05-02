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
      isSelected: false
    },
    {
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
  withHandlers({
    printPasswords: ({ modal, selectedStudents }) => {
      return modal.showModal({
        name: 'printPasswords',
        students: selectedStudents
      })
    },
    removeStudents: props => e => {
      Modal.confirm({
        title: 'Remove students?',
        content: `The following students will be removed from your class:\n\n ${props.selectedStudents
          .map(student => student.displayName)
          .join(', ')}`,
        okText: 'Yes',
        cancelText: 'No',
        async onOk () {
          try {
            await props.rpc('class.removeStudents', {
              class: props.class,
              students: props.selectedStudents.map(student => student.id)
            })
            message.success(`students removed`)
          } catch (e) {
            message.error(e.error)
          }
        }
      })
    }
  })
)
