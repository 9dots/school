import createAction from '@f/create-action'

const showModal = createAction(
  '<modals/>: SHOW_MODAL',
  (name, props) => ({
    name,
    props
  }),
  (name, props, authRequired) => ({ authRequired })
)
const hideModal = createAction('<modals/>: HIDE_MODAL', name => ({ name }))

export default function (state = {}, action) {
  switch (action.type) {
    case showModal.type:
      return {
        ...state,
        [action.payload.name]: action.payload.props || true
      }
    case hideModal.type:
      return {
        ...state,
        [action.payload.name]: false
      }
  }
  return state
}

export { showModal, hideModal }
