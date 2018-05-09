import { firestoreConnect } from 'react-redux-firebase'
import waitFor from '../../components/waitFor'
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { rpc } from '../actions'

const getProgressString = (lesson, uid) => `lessonProgress-${lesson}-${uid}`

export default compose(
  connect(
    ({ firebase: { auth, profile } }, props) => ({
      lessonId: props.match.params.lessonId,
      taskNum: props.match.params.taskNum,
      profile: props.profile || profile,
      uid: props.uid || auth.uid
    }),
    { rpc }
  ),
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [['student', '==', props.uid], ['lesson', '==', props.lessonId]],
      storeAs: getProgressString(props.lessonId, props.uid)
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    progress:
      (ordered[getProgressString(props.lessonId, props.uid)] || []).length > 0
        ? ordered[getProgressString(props.lessonId, props.uid)].sort(
          (a, b) => a.index - b.index
        )
        : undefined
  })),
  waitFor(['progress', 'uid', 'profile']),
  lifecycle({
    componentDidMount () {
      const {
        uid,
        lessonId,
        progress,
        taskNum,
        teacherView,
        firestore
      } = this.props
      firestore.setListener({
        collection: 'activities',
        where: [['student', '==', uid], ['lesson', '==', lessonId]],
        storeAs: getProgressString(lessonId, uid)
      })
      if (progress && !teacherView) {
        this.props.rpc(
          'activity.setActive',
          {
            activity: progress[taskNum].id,
            lesson: lessonId
          },
          {
            debounce: {
              time: 100,
              key: 'SET_ACTIVE'
            }
          }
        )
      }
    },
    componentWillUnmount () {
      const { progress, taskNum } = this.props
      this.props.rpc('activity.maybeSetCompleted', {
        activity: progress[taskNum].id
      })
    },
    componentWillUpdate (nextProps) {
      if (!this.props.isLoaded && nextProps.isLoaded) {
        const { lessonId, progress, taskNum, teacherView } = nextProps
        if (!teacherView) {
          this.props.rpc(
            'activity.setActive',
            {
              activity: progress[taskNum].id,
              lesson: lessonId
            },
            {
              debounce: {
                time: 100,
                key: 'SET_ACTIVE'
              }
            }
          )
        }
      }
    }
  })
)
