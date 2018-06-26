import modalContainer from 'components/modalContainer'
import { firestoreConnect } from 'react-redux-firebase'
import {
  compose,
  withHandlers,
  branch,
  renderNothing,
  withProps
} from 'recompose'
import formModal from 'components/formModal'
import { getFormDefaults } from 'utils'
import { connect } from 'react-redux'
import { rpc } from '../../actions'
import schema from 'school-schema'
import { message } from 'antd'
import xlsx from 'xlsx'

export default compose(
  modalContainer,
  firestoreConnect(props => [
    {
      collection: 'users',
      where: [`schools.${props.school}`, '==', true],
      storeAs: `studentLists-${props.school}`
    }
  ]),
  connect(
    ({ firestore: { ordered } }, props) => ({
      studentListData: ordered[`studentLists-${props.school}`]
    }),
    { rpc }
  ),
  branch(props => props.studentListData === undefined, renderNothing),
  withProps(props => ({
    studentList: props.studentListData.filter(
      ({ id }) => !(props.class.members || {})[id]
    )
  })),
  withHandlers({
    parseCsv: props => async e => {
      const file = e.target.files[0]

      const reader = new window.FileReader()

      reader.onloadend = function (e) {
        const csv = xlsx.read(e.target.result, { type: 'binary' })
        const json = xlsx.utils.sheet_to_json(csv.Sheets[csv.SheetNames[0]], {
          header: 1,
          raw: true
        })

        props.onCancel(null)
        return props.modal.showModal(
          {
            name: 'studentCsvModal',
            data: json,
            school: props.school,
            class: props.class
          },
          null
        )
      }

      reader.readAsBinaryString(file)
    }
  }),
  formModal({
    displayName: 'addStudentToClass',
    mapPropsToValues: props => ({ class: undefined }),
    handleSubmit: async (values, { props }) => {
      props.setLoading(true)
      try {
        await props.rpc('class.addStudent', cast(values, props))
        return props.onOk('Successfully added.')
      } catch (e) {
        message.error(e.error)
      }
      props.setLoading(false)
    },
    ...getFormDefaults(schema.class.addStudent, cast)
  }),
  branch(props => props.studentList.length['studentList'])
)

function cast (values, props) {
  return {
    class: props.class.id,
    student: values.student
  }
}
