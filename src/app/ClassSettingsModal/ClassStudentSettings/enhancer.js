import { compose, withHandlers, withStateHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { rpc } from 'app/actions'

export default compose(
  connect(() => ({}), { rpc }),
  withStateHandlers(
    { selectedStudents: [] },
    {
      setSelectedStudents: () => (ids, selectedStudents) => ({
        selectedStudents
      })
    }
  ),
  withProps(props => ({
    tableConfig: {
      onChange: props.setSelectedStudents
    }
  })),
  withHandlers({
    removeStudents: props => e => {
      Modal.confirm({
        title: 'Remove students?',
        content: `The following students will be removed from class:\n\n ${props.selectedStudents.map(
          student => student.displayName + '\n'
        )}`,
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
