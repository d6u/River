# River

*River* is a reactive stream composer for React application.

## Influences

River was inspired by [Flux](http://facebook.github.io/flux/) and [RxJS](https://github.com/Reactive-Extensions/RxJS). In River, all stores are composed by Rx Observables, where stores are mostly likely to be [hot observables](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables). When combined with [stateless function components in React 0.14](http://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components), React + Flux architecture can be greatly simplified. This is very similar to pure view functions in [Cycle.js](http://cycle.js.org/).

## Installation

To install:

```sh
npm install --save river-react
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

You also want to install [RxJS](https://github.com/Reactive-Extensions/RxJS) if you haven't done so.

```sh
npm install --save rx
```

## Prerequisite

River assumes developer is familiar with the usage of [RxJS](https://github.com/Reactive-Extensions/RxJS). River is merely a set of utility functions to help compose data layer and bind React components to consume the data.

## Hello Example

Using React 0.14-rc1, RxJS 3.x

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';
import { createAction, createStore, subscribe } from 'river-react';

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

ReactDOM.render(<AppContainer />, node);
```

## API

Before River reach 1.0, API will change between minor version bumps.

### `createAction(subject)`

This is a wrapper around instance of Rx Subject. It gives `subject.onNext` a short cut.

```js
let addSubject = new Rx.Subject();
let add = createAction(addSubject);

add(value); // same as `addSubject.onNext(value)`;
```

### `createStore(observableFactory)`

This makes a Rx Observable [hot](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/creating.md#cold-vs-hot-observables) and [replay](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/replay.md) last value, and connects the observable when created.

```js
let counterStream = createStore(() => {
  return addSubject
    .scan((count, _) => count + 1, 0)
    .startWith(0);
});
```

Which is equivalent to:

```js
let counterStream = addSubject
  .scan((count, _) => count + 1, 0)
  .startWith(0)
  .replay(null, 1);
});

counterStream.connect();
```

### `subscribe(Component, observableMap, [initialState])`

This creates a new React Component by wrapping a provided one, and pass `state` into wrapped Component as `props`. Optionally, you can specify `initialState` for your Component.

```js
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

ReactDOM.render(<AppContainer />, node);
```

Internally, `subscribe` uses [`combineLatestObj`](https://github.com/staltz/combineLatestObj) method to shallow convert `observableMap` into a new observabe. E.g. for `{counter: counterStream}`, when `counterStream` emits `123`, the new observable will emit `{counter: 123}`. `{counter: 123}` will eventually be passed as `props` to `App` component.

## Examples

- Chat example [https://github.com/d6u/river-chat](https://github.com/d6u/river-chat)
