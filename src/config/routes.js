import { Route, Switch } from 'react-router-dom'

var routes = (
  <Route name='Boot'>
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
  </Route>
)

var route = isTeacher ? (
  <Switch>
    <Route name='Teacher' path='/' component={TeacherLayout}>
      <Route name='/classes' component={Classes} />
    </Route>
  </Switch>
) : (
  <Switch>
    <Route name='Student' path='/' component={TeacherLayout}>
      <Route name='/classes' component={Classes} />
    </Route>
  </Switch>
)
