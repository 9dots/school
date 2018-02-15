import formModal from '../../components/formModal/formModal'
import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor/waitFor'
import modalContainer from 'components/modalContainer'
import { allClasses, uid } from '../../selectors'
import { compose, withHandlers } from 'recompose'
import mapValues from '@f/map-values'
import { connect } from 'react-redux'
import { rpc } from '../actions'
import { message } from 'antd'

export default compose(
  modalContainer,
  formModal({ form: 'addCourse' }),
  connect(state => ({
    uid: uid(state)
  })),
  firestoreConnect(props => [
    {
      collection: 'classes',
      where: [`teachers.${props.uid}`, '==', true],
      storeAs: `allClasses`
    }
  ]),
  connect(
    (state, props) => ({
      classes: allClasses(state),
      modalId: getSuccessModal(props.id)
    }),
    { rpc }
  ),
  withHandlers({
    onSubmit: props => async values => {
      if (Object.keys(values).length === 0) {
        return
      }
      try {
        props.setLoading(true)
        await Promise.all(formatSubmit(props, values))
        props.hideModal(props.id, null)
        props.showModal({
          name: props.modalId,
          classes: getSubmittedClasses(props, values)
        })(null)
      } catch (e) {
        props.setLoading(false)
        message.error('Oops, something went wrong. Please try again.')
      }
    }
  }),
  waitFor(['classes'])
)

function getSubmittedClasses (props, values) {
  return props.classes.filter(cls => Object.keys(values).indexOf(cls.id) > -1)
}

function formatSubmit (props, values) {
  return mapValues(
    (cls, key) =>
      props.rpc('class.addCourse', {
        course: props.courseId,
        class: key
      }),
    values
  )
}

function getSuccessModal (id) {
  return 'success-' + (id || 'modal')
}
