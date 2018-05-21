import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from 'app/actions'

import { message, Modal } from 'antd'
const confirm = Modal.confirm

export default compose(
  connect(({ firestore: { data } }, props) => ({ student: data[props.uid] }), {
    rpc
  }),
  withHandlers({
    deleteStudent: ({
      rpc,
      class: { id, displayName },
      uid,
      student
    }) => () => {
      confirm({
        title: 'Remove Student',
        content: `Are you sure want to remove ${
          student.displayName
        } from ${displayName}?`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk () {
          try {
            await rpc('class.removeStudent', {
              student: uid,
              class: id
            })
            message.success('Student removed')
          } catch (e) {
            message.error(e)
          }
        }
      })
    }
  })
)
