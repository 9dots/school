import { firestoreConnect } from 'react-redux-firebase'
import waitFor from 'components/waitFor'
import { connect } from 'react-redux'
import Loading from 'app/Loading'
import { rpc } from '../actions'
import {
  renderComponent,
  lifecycle,
  withProps,
  compose,
  branch
} from 'recompose'

function getProgressString (mod, lesson, uid) {
  return mod + '-' + lesson + '-' + uid
}

export default compose(
  connect(({ firebase: { auth, profile } }, props) => ({
    lessonId: props.match.params.lessonId,
    taskNum: Number(props.match.params.taskNum),
    profile: props.profile || profile,
    moduleId: props.match.params.moduleId,
    uid: props.uid || auth.uid
  })),
  firestoreConnect(props => [
    {
      collection: 'modules',
      doc: props.moduleId,
      storeAs: props.moduleId
    },
    {
      collection: 'modules',
      doc: props.moduleId,
      subcollections: [
        {
          collection: 'progress',
          doc: props.lessonId,
          subcollections: [{ collection: 'users', doc: props.uid }]
        }
      ],
      storeAs: getProgressString(props.moduleId, props.lessonId, props.uid)
    }
  ]),
  connect(
    ({ firestore }, { moduleId, lessonId, uid }) => ({
      mod: firestore.data[moduleId],
      progressData: firestore.data[getProgressString(moduleId, lessonId, uid)]
    }),
    { rpc }
  ),
  branch(props => !props.mod || !props.progressData, renderComponent(Loading)),
  connect(({ firestore }, { mod, lessonId }) => ({
    activeLesson: mod ? mod.lessons.find(l => l.id === lessonId) : {},
    tasks: mod ? mod.lessons.find(l => l.id === lessonId).tasks : []
  })),
  firestoreConnect(props => [
    {
      collection: 'activities',
      where: [
        ['student', '==', props.uid],
        ['task', '==', props.tasks[props.taskNum].id],
        ['module', '==', props.moduleId]
      ],
      storeAs: 'activityProgress-' + props.uid + '-' + props.taskNum
    }
  ]),
  connect((state, props) => {
    const activityProgress =
      state.firestore.ordered[`activityProgress-${props.uid}-${props.taskNum}`]
    return {
      task: props.tasks[props.taskNum],
      activityProgress: activityProgress ? activityProgress[0] : undefined
    }
  }),
  withProps(props => ({
    progress: props.tasks.map(task => ({
      ...task,
      ...props.progressData.tasks[task.id],
      ...(task.id === props.task.id ? props.activityProgress : {})
    }))
  })),
  waitFor(['progress', 'uid', 'mod', 'profile', 'activityProgress']),
  lifecycle({
    componentDidMount () {
      const {
        teacherView,
        lessonId,
        progress,
        taskNum,
        firestore,
        moduleId,
        isLoaded,
        uid
      } = this.props
      firestore.setListeners([
        {
          collection: 'modules',
          doc: moduleId,
          storeAs: moduleId
        },
        {
          collection: 'modules',
          doc: moduleId,
          subcollections: [
            {
              collection: 'progress',
              doc: lessonId,
              subcollections: [{ collection: 'users', doc: uid }]
            }
          ],
          storeAs: getProgressString(moduleId, lessonId, uid)
        }
      ])
      if (progress && isLoaded && !teacherView) {
        this.props.rpc(
          'module.setActive',
          {
            activity: progress[taskNum],
            module: moduleId,
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
        const { moduleId, lessonId, progress, taskNum, teacherView } = nextProps
        if (progress.length && !teacherView) {
          this.props.rpc(
            'module.setActive',
            {
              activity: progress[taskNum],
              module: moduleId,
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
