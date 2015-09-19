# River

*River* is a reactive stream composer for React application.

## Influences

River was developed upon [RxJS](https://github.com/Reactive-Extensions/RxJS). The goal is to let React developers easily create reactive and composable data layer in [Flux](http://facebook.github.io/flux/) style. River was inspired by many Flux flavored libraries, e.g. [Redux](https://github.com/rackt/redux).

## Installation

To install:

```
npm install --save river-react
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

## Prerequisite

River assumes developer is familiar with the usage of [RxJS](https://github.com/Reactive-Extensions/RxJS). River is merely a set of utility functions to help compose data layer and bind React components to consume the data.

## Hello Example

Using React 0.14, RxJS 3.x

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import { createAction, createStream, subscribe } from 'river-react';

//// Action
let add = createAction(new Rx.Subject());

//// Stream (a.k.a. Store in Flux)
let counterStream = createStream((add) => {
  return add
    .scan((count, _) => count + 1, 0)
    .startWith(0);
})(add);

//// React Component
let Counter = (props) => {
  return <div>{props.counter}</div>;
};

let App = subscribe({counter: counterStream}, Counter);

ReactDOM.render(<App />, node);
```
