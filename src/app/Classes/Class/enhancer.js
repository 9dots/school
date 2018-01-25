import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../../actions'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'classes',
      doc: props.match.params.classId,
      storeAs: props.match.params.classId
    }
  ]),
  connect(
    ({ firestore: { data } }, props) => ({
      classData: data[props.match.params.classId]
    }),
    { rpc }
  ),
  lifecycle({
    componentDidUpdate (prevProps) {
      if (
        (!isLoaded(prevProps.classData) ||
          prevProps.match.params.classId !== this.props.match.params.classId) &&
        isLoaded(this.props.classData)
      ) {
        const classId = this.props.match.params.classId
        const schoolId = this.props.classData.school
        this.props.rpc('user.setNav', {
          [`nav.class.${schoolId}`]: classId,
          [`nav.school`]: schoolId
        })
      }
    }
  })
)
