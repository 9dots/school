import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { version } from './app/Terms'
import Loading from './app/Loading'

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => !state.firebase.profile.isEmpty,
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  AuthenticatingComponent: Loading,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/courses'
})

export const userHasSchool = connectedRouterRedirect({
  redirectPath: '/onboarding',
  allowRedirectBack: false,
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  AuthenticatingComponent: Loading,
  authenticatedSelector: state =>
    state.firebase.profile &&
    Object.keys(state.firebase.profile.schools || {}).length > 0,
  wrapperDisplayName: 'UserHasSchool'
})

export const agreedToTerms = connectedRouterRedirect({
  redirectPath: '/terms',
  allowRedirectBack: false,
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  AuthenticatingComponent: Loading,
  authenticatedSelector: ({ firebase: { profile } }) =>
    profile &&
    (profile.role !== 'teacher' ||
      (parseInt(profile.termsVersion, 10) || 0) >= version),
  wrapperDisplayName: 'AgreedToTerms'
})

export const userHasNoSchool = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state =>
    state.firebase.profile &&
    Object.keys(state.firebase.profile.schools || {}).length === 0,
  wrapperDisplayName: 'UserHasNoSchool'
})

const splashDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  AuthenticatingComponent: Loading,
  authenticatedSelector: state => {
    return state.firebase.profile.isLoaded && !state.firebase.profile.isEmpty
  },
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  wrapperDisplayName: 'SplashRedirect'
}

export const userIsNotAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  AuthenticatingComponent: Loading,
  authenticatedSelector: state => {
    return state.firebase.profile.isLoaded && state.firebase.profile.isEmpty
  },
  authenticatingSelector: state => !state.firebase.profile.isLoaded,
  wrapperDisplayName: 'UserIsNotAuthenticated'
}

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
)

export const splashRedir = connectedRouterRedirect({
  ...splashDefaults,
  redirectPath: (state, ownProps) => '/courses',
  allowRedirectBack: false
})
