import { getFormDefaults, getValidationErrors } from 'utils'
import { firestoreConnect } from 'react-redux-firebase'
import addLoading from 'components/addLoading'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'
import { message } from 'antd'

export default compose(
  addLoading,
  firestoreConnect(({ classData }) => [
    ...Object.keys(classData.teachers || []).map(t => ({
      collection: 'users',
      doc: t,
      storeAs: t
    })),
    {
      collection: 'schools',
      doc: classData.school,
      storeAs: classData.school
    }
  ]),
  connect(
    ({ firestore: { data } }, { classData }) => ({
      teachers: Object.keys(classData.teachers || []).map(t => data[t]),
      school: data[classData.school]
    }),
    { rpc }
  ),
  withFormik({
    displayName: 'courseDetails',
    mapPropsToValues: ({ initialValues }) => ({
      displayName: '',
      grade: undefined,
      ...initialValues
    }),
    handleSubmit: async (values, { props, resetForm }) => {
      props.setLoading(true)
      try {
        await props.rpc('class.updateDetails', cast(values, props))
        resetForm(values)
        props.setLoading(false)
      } catch (e) {
        props.setLoading(false)
        if (e.errorDetails) {
          throw getValidationErrors(e)
        }
        message.error(e.error)
      }
    },
    ...getFormDefaults(schema.class.updateDetails, cast)
  }),
  waitFor(['teachers', 'school'])
)

function cast (values, props) {
  return {
    ...values,
    class: props.classData.id
  }
}
