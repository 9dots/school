import map from '@f/map'

const progressByStudent = (state, lesson, students) => {
  const progress = stateToProgress(state, lesson)
  return map(
    (val, key) =>
      (progress[key] || []).length > 0
        ? { student: state.firestore.data[key], progress: progress[key] }
        : { student: state.firestore.data[key] },
    students
  )
}
const classBySchools = (state, schools) => {
  return map(
    (classes, key) => ({
      ...state.firestore.data[key],
      classes
    }),
    getClasses(state, schools)
  )
}
const moduleSelector = (state, mods) =>
  mods.map(
    m => state.firestore.data[m] && { id: m, ...state.firestore.data[m] }
  )
const classes = (state, id) => state.firestore.ordered[`classes-${id}`]
const allClasses = state => state.firestore.ordered[`allClasses`]
const courses = state => state.firestore.ordered.courses
const course = (state, id) => state.firestore.data[id]
const school = (state, id) => state.firestore.data[id]
const profile = state => state.firebase.profile
const uid = state => state.firebase.auth.uid

export {
  progressByStudent,
  classBySchools,
  moduleSelector,
  allClasses,
  courses,
  classes,
  profile,
  course,
  school,
  uid
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

function stateToProgress (state, lesson) {
  return Object.keys(state.firestore.ordered)
    .filter(key => key.indexOf(`lessonProgress-${lesson}`) === 0)
    .reduce(
      (acc, key) => ({
        ...acc,
        [getStudentFromProgress(key, lesson)]: state.firestore.ordered[key]
      }),
      {}
    )
}

function getStudentFromProgress (key, lesson) {
  return key.slice(`lessonProgress-${lesson}`.length + 1)
}
