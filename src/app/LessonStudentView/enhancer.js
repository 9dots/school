import { firestoreConnect } from 'react-redux-firebase'
import { studentAssignment } from '../../selectors'
import waitFor from '../../components/waitFor'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../actions'

export default compose(
  connect(
    ({ firebase: { auth, profile } }, props) => ({
      lessonId: props.match.params.lessonId,
      taskNum: props.match.params.taskNum,
      uid: auth.uid,
      profile
    }),
    { rpc }
  ),
  lifecycle({
    componentWillMount () {
      const { lessonId, progress, taskNum } = this.props
      this.props.rpc('activity.setActive', {
        activity: progress[taskNum].id,
        lesson: lessonId
      })
    }
  }),
  waitFor(['progress', 'uid', 'profile'])
)
