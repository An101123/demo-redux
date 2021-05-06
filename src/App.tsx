import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { HomePage } from './features/homepage/homepage';
import { Quiz } from './features/quiz/Quiz';
import QueryTest  from './features/QueryTest';
import './App.css';
import { Switch, Route, Link } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/count" component={Counter} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/query" component={QueryTest} />
      </Switch>
    </div>
  );
}

export default App;
