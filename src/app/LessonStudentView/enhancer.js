import { firestoreConnect } from 'react-redux-firebase'
import { compose, lifecycle } from 'recompose'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import { rpc } from '../actions'

function getData (ordered, props, task) {
  const val = ordered[props.uid + '-' + task.id]
  if (!val) return undefined
  if (!val.length) return undefined
  return val
}

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
      mod: firestore.data[props.match.params.moduleId],
      lessonId: props.match.params.lessonId,
      taskNum: props.match.params.taskNum,
      profile: props.profile || profile,
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
      where: [
        ['student', '==', props.uid],
        ['task', '==', task.id],
        ['module', '==', props.match.params.moduleId]
      ],
      storeAs: props.uid + '-' + task.id
    }))
  ),
  connect(({ firestore: { ordered, data } }, props) => ({
    progress: props.tasks.length
      ? props.tasks
        .map(task => getData(ordered, props, task))
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
        match,
        teacherView,
        isLoaded,
        firestore
      } = this.props
      firestore.setListeners(
        tasks
          .map(task => ({
            collection: 'activities',
            where: [
              ['student', '==', uid],
              ['task', '==', task.id],
              ['module', '==', match.params.moduleId]
            ],
            storeAs: uid + '-' + task.id
          }))
          .concat({
            collection: 'modules',
            doc: match.params.moduleId,
            storeAs: match.params.moduleId
          })
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
      if (progress && progress[taskNum] && !teacherView) {
        this.props.rpc('activity.maybeSetCompleted', {
          activity: progress[taskNum].id
        })
      }
    },
    componentWillUpdate (nextProps) {
      if (!this.props.isLoaded && nextProps.isLoaded) {
        const { lessonId, progress, taskNum, teacherView } = nextProps
        if (progress.length && !teacherView) {
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
