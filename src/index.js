import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Components/header';
import Footer from './Components/footer';
import Singlepost from './Components/singlepost';

const routing = (
  <Router>
    <React.StrictMode>
    <Header/>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/post/:slug" component={Singlepost} />
    </Switch>
    <Footer/>
    </React.StrictMode>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
