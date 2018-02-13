const classes = (state, id) => state.firestore.ordered[`classes-${id}`]
const allClasses = state => state.firestore.ordered[`allClasses`]
const courses = state => state.firestore.ordered.courses
const school = (state, id) => state.firestore.data[id]
const profile = state => state.firebase.profile
const uid = state => state.firebase.auth.uid

export { classes, school, profile, uid, allClasses, courses }
