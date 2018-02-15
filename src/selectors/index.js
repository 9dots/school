import map from '@f/map'

const classBySchools = (state, schools) => {
  return map(
    (classes, key) => ({
      ...state.firestore.data[key],
      classes
    }),
    getClasses(state, schools)
  )
}
const classes = (state, id) => state.firestore.ordered[`classes-${id}`]
const allClasses = state => state.firestore.ordered[`allClasses`]
const course = (state, id) => state.firestore.data[id]
const courses = state => state.firestore.ordered.courses
const moduleSelector = (state, mods) =>
  mods.map(
    m => state.firestore.data[m] && { id: m, ...state.firestore.data[m] }
  )
const school = (state, id) => state.firestore.data[id]
const profile = state => state.firebase.profile
const uid = state => state.firebase.auth.uid

export {
  classes,
  school,
  profile,
  uid,
  allClasses,
  classBySchools,
  courses,
  course,
  moduleSelector
}

function getClasses (state, schools) {
  return schools.reduce(
    (acc, school) => ({
      ...acc,
      [school]: ((state.firestore.ordered || {}).allClasses || []).filter(
        cls => cls.school === school
      )
    }),
    {}
  )
}
