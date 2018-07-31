import { compose, withStateHandlers, withHandlers, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'
import urlJoin from 'url-join'
import { setUrl } from 'app/actions'
import { connect } from 'react-redux'

export default compose(
  withRouter,
  connect(
    null,
    { setUrl }
  ),
  withStateHandlers(({ collapsed = true }) => ({ collapsed }), {
    // openSider: () => e => {
    //   e.stopPropagation()
    //   return { collapsed: false }
    // },
    // closeSider: () => () => {
    //   console.log('call')
    //   return { collapsed: true }
    // },
    toggleSider: ({ collapsed }) => () => ({ collapsed: !collapsed })
  }),
  withHandlers({
    goTo: ({ setUrl, match: { params } }) => i => {
      return setUrl(getNewPath(params, i))
    },
    next: ({ setUrl, progress, match }) => () => {
      const { params } = match
      const { classId, taskNum } = params

      const length = progress.length
      const cur = parseInt(taskNum, 10)

      const path =
        length <= cur + 1
          ? `/class/${classId}/`
          : getNewPath(params, Math.min(length - 1, cur + 1))

      return setUrl(path)
    }
  })
  // lifecycle({
  //   componentWillUnmount () {
  //     const { closeSider } = this.props
  //     window.removeEventListener('click', closeSider)
  //   },
  //   componentWillReceiveProps (nextProps) {
  //     const { collapsed, closeSider } = this.props

  //     if (nextProps.collapsed !== collapsed) {
  //       collapsed
  //         ? window.addEventListener('click', closeSider)
  //         : window.removeEventListener('click', closeSider)
  //     }
  //   }
  // })
)

function getNewPath (params, i) {
  const { classId, moduleId, lessonId, uid = '', studentId = '' } = params
  return urlJoin(
    '/class',
    classId,
    'module',
    moduleId,
    'lesson',
    lessonId,
    '' + i,
    uid,
    studentId
  )
}
