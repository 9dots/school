import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { getFormDefaults } from 'utils'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFormik } from 'formik'
import schema from 'school-schema'
import { rpc } from 'app/actions'

export default compose(
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
    handleSubmit: (values, { props }) => {
      console.log('submit')
    }
    // ...getFormDefaults(schema.class.updatem)
  }),
  waitFor(['teachers', 'school'])
)
