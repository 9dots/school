import { compose, withStateHandlers, withHandlers } from 'recompose'
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
    toggleCollapsed: ({ collapsed }) => () => ({ collapsed: !collapsed })
  }),
  withHandlers({
    goTo: ({ setUrl, match: { params } }) => i => {
      return setUrl(getNewPath(params, i))
    },
    next: ({ setUrl, progress, match }) => {
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
)

function getNewPath (params, i) {
  const { classId, moduleId, lessonId, uid = '' } = params
  return urlJoin(
    '/class',
    classId,
    'module',
    moduleId,
    'lesson',
    lessonId,
    '' + i,
    uid
  )
}