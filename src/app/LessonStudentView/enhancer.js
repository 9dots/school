import waitFor from '../../components/waitFor'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../actions'

export default compose(
  connect(
    ({ firebase: { auth, profile } }, props) => ({
      lessonId: props.match.params.lessonId,
      taskNum: props.match.params.taskNum,
      profile: props.profile || profile,
      uid: auth.uid
    }),
    { rpc }
  ),
  lifecycle({
    componentWillMount () {
      const { lessonId, progress, taskNum, teacherView } = this.props
      if (!teacherView) {
        this.props.rpc('activity.setActive', {
          activity: progress[taskNum].id,
          lesson: lessonId
        })
      }
    }
  }),
  waitFor(['progress', 'uid', 'profile'])
)
