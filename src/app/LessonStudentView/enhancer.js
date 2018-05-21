import { firestoreConnect } from 'react-redux-firebase'
import { compose, lifecycle } from 'recompose'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { rpc } from '../actions'

export default compose(
  firestoreConnect(props => [
    {
      collection: 'modules',
      doc: props.match.params.moduleId,
      storeAs: props.match.params.moduleId
    }
  ]),
  connect(
    ({ firestore, firebase: { auth, profile } }, props) => ({
      lessonId: props.match.params.lessonId,
      taskNum: props.match.params.taskNum,
      profile: props.profile || profile,
      mod: firestore.data[props.match.params.moduleId],
      uid: props.uid || auth.uid
    }),
    { rpc }
  ),
  connect(({ firestore }, props) => ({
    tasks: props.mod
      ? props.mod.lessons.find(l => l.id === props.lessonId).tasks
      : []
  })),
  firestoreConnect(props =>
    props.tasks.map(task => ({
      collection: 'activities',
      where: [['student', '==', props.uid], ['task', '==', task.id]],
      storeAs: task.id
    }))
  ),
  connect(({ firestore: { ordered } }, props) => ({
    progress: props.tasks.length
      ? props.tasks
        .map(task => ordered[task.id])
        .reduce((acc, next) => acc.concat(next), [])
      : undefined
  })),
  waitFor(['progress', 'uid', 'profile']),
  lifecycle({
    componentDidMount () {
      const {
        uid,
        lessonId,
        progress,
        tasks,
        taskNum,
        teacherView,
        isLoaded,
        firestore
      } = this.props
      firestore.setListeners(
        tasks.map(task => ({
          collection: 'activities',
          where: [['student', '==', uid], ['task', '==', task.id]],
          storeAs: task.id
        }))
      )
      if (progress && isLoaded && !teacherView) {
        this.props.rpc(
          'activity.setActive',
          {
            activity: progress[taskNum].id,
            lesson: lessonId
          },
          {
            debounce: {
              time: 300,
              key: 'SET_ACTIVE'
            }
          }
        )
      }
    },
    componentWillUnmount () {
      const { teacherView, progress, taskNum } = this.props
      if (!teacherView) {
        this.props.rpc('activity.maybeSetCompleted', {
          activity: progress[taskNum].id
        })
      }
    },
    componentWillUpdate (nextProps) {
      if (!this.props.isLoaded && nextProps.isLoaded) {
        const { lessonId, progress, taskNum, teacherView } = nextProps
        if (progress && !teacherView) {
          this.props.rpc(
            'activity.setActive',
            {
              activity: progress[taskNum].id,
              lesson: lessonId
            },
            {
              debounce: {
                time: 300,
                key: 'SET_ACTIVE'
              }
            }
          )
        }
      }
    }
  })
)
