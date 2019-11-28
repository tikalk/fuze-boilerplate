import React, { useState, useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'; 

window.history.pushState = window.history.replaceState = (state, title, path) => {
  window.location.hash = path;
};
window.addEventListener('hashchange', e => {
  e.preventDefault();
  // e.stopPropagation();
})
window.addEventListener('popstate', e => {
  e.preventDefault();
  // e.stopPropagation();
});

function Home() {
  const [ state, setState ] = useState(0);
  let timeout;
  useEffect(() => () => {
    if (timeout) clearTimeout(timeout);
  });
  timeout = setTimeout(() => {
    AppContext.require('random.service').then(service => setState(service().toFixed(5).slice(2)));
  }, 1000);
  return <h2>Home {state}</h2>
}
function Settings() {
  return <h2>Settings</h2>
}

let changeClickState;

AppContext.require('click.service').then(emitter => {
  emitter.subscribe((value) => {
    if (changeClickState) {
      changeClickState(value);
    }
  });
});

function App() {
  const [ userClick, setClick ] = useState();
  changeClickState = setClick;
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        Microfronts Demo: React module
        <p>The data for user clicks is retreived from angular application via the Application Context</p>
        <p>User clicked: {userClick}</p>
        <Link to="/home">GO HOME</Link>
        <Link to="/settings">GO TO SETTINGS</Link>
        <Link to="/side-by-side">GO SIDE BY SIDE</Link>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/settings">
            <Settings></Settings>
          </Route>
          </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
