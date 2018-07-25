import getProp from '@f/get-prop'
import map from '@f/map'

const progressByStudent = (state, lesson, students, mod) => {
  const progress = state.firestore.data[`${mod}-${(lesson || {}).id}`] || {}
  return map(
    (_, key) => ({
      student: state.firestore.data[key],
      progress:
        lesson &&
        lesson.tasks.map(t => {
          const taskProgress = (progress[key] || {})[t.id] || {}
          return {
            ...t,
            ...taskProgress,
            lesson: lesson.id,
            module: mod
          }
        })
    }),
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

const schoolClasses = (state, school) => {
  const classes = state.firestore.data[`${school}-classes`] || {}
  return Object.keys(classes).map(key => ({ id: key, ...classes[key] }))
}

const moduleSelector = (state, mods) =>
  mods.map(
    m => state.firestore.data[m] && { ...state.firestore.data[m], id: m }
  )
const students = (state, students) =>
  Object.keys(students).map(student => {
    if (state.firestore.data[student]) {
      return {
        id: student,
        ...state.firestore.data[student]
      }
    }
  })
const classes = (state, id) => state.firestore.ordered[`classes-${id}`]
const allClasses = state => state.firestore.ordered[`allClasses`]
const studentAssignment = (state, id, lesson) =>
  getProp(`lessonProgress-${lesson}-${id}`, state.firestore.data)
const myCourses = state => state.firestore.ordered.myCourses
const courses = state => state.firestore.ordered.courses
const draft = (state, id) =>
  getProp(`courses.${id}.drafts`, state.firestore.data)
const course = (state, id) => getProp(id, state.firestore.data)
const school = (state, id) => state.firestore.data[id]
const profile = state => state.firebase.profile
const uid = state => state.firebase.auth.uid

export {
  progressByStudent,
  studentAssignment,
  classBySchools,
  moduleSelector,
  schoolClasses,
  allClasses,
  myCourses,
  students,
  courses,
  classes,
  profile,
  course,
  school,
  draft,
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
