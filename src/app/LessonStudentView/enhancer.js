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
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [['student', '==', 'uid'], ['lesson', '==', props.lessonId]],
      storeAs: `progress-${props.uid}-${props.lessonId}`
    }
  ]),
  connect((state, { lessonId, uid }) => ({
    progress: studentAssignment(state, uid, lessonId),
    log: studentAssignment(state, uid, lessonId)
  })),
  lifecycle({
    componentWillMount () {
      const { taskNum, uid, lessonId } = this.props
      this.props.rpc('user.setAssignedLessonIndex', {
        current: Number(taskNum),
        user: uid,
        lesson: lessonId
      })
    }
  }),
  waitFor(['progress', 'uid', 'profile'])
)
