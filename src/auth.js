import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from './app/Loading'

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => !state.firebase.profile.isEmpty,
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
})

export const userHasSchool = connectedRouterRedirect({
  redirectPath: '/onboarding',
  allowRedirectBack: false,
  authenticatedSelector: state =>
    state.firebase.profile &&
    Object.keys(state.firebase.profile.schools || {}).length > 0,
  wrapperDisplayName: 'UserHasSchool'
})

export const userHasNoSchool = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state =>
    state.firebase.profile &&
    Object.keys(state.firebase.profile.schools || {}).length === 0,
  wrapperDisplayName: 'UserHasNoSchool'
})

const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state =>
    state.firebase.profile.isEmpty && state.firebase.profile.isLoaded,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
)

export const userIsNotAuthenticatedRedir = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false
})

// lastSchool: 'school1'
// lastClass: {
//   school1: 'class1',
//   school2: 'class1',
//   school3: 'class3'
// }

// updateLastSchool(schoolId)
// componentWillMount () {
//   updateLastClass('route')
//   updateLastSchool(classData.school)
// }
