import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import { createAction, createStore, subscribe } from '../../src/index';

//// Action
let addSubject = new Rx.Subject();
let add = createAction(addSubject);

//// Stream (a.k.a. Store in Flux)
let counterStream = createStore(() => {
  return addSubject
    .scan((count, _) => count + 1, 0)
    .startWith(0);
});

//// React Component using 0.14 function component style
let App = (props) => {
  return (
    <div>
      <h1>{props.counter}</h1>
      <button onClick={add}>+1</button>
    </div>
  );
};

let initialState = {counter: 1};
let AppContainer = subscribe(App, {counter: counterStream}, initialState);

ReactDOM.render(<AppContainer />, document.getElementById('react'));
