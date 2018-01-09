import { Route, Switch } from 'react-router-dom'

var routes = (
  <Router>
    <Route name='App'>
      <Route name='Teacher'>
        <Route name='Class' />
        <Route name='Grades' />
        <Route name='Preview' />
        <Route name='Browse'>
          <Route name='Course' />
        </Route>
      </Route>
      <Route name='Student'>
        <Route name='Start' />
        <Route name='Lesson' />
      </Route>
    </Route>
    <Route name='Splash' />
  </Router>
)

var route = isTeacher ? (
  <Switch>
    <TeacherLayout>
      <Route name='/classes' component={Classes} />
    </TeacherLayout>
  </Switch>
) : (
  <Switch>
    <Route name='Student' path='/' component={TeacherLayout}>
      <Route name='/classes' component={Classes} />
    </Route>
  </Switch>
)
