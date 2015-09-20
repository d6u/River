import React, { Component } from 'react';
import combineLatestObj from './util/combineLatestObj';

export default function subscribe(WrappedComponent, streamMap, initialState) {
  const stateStream = combineLatestObj(streamMap);

  class Subscribe extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    componentDidMount() {
      this.disposable = stateStream.subscribeOnNext(state => this.setState(state));
    }

    componentWillUnmount() {
      this.disposable.dispose();
    }

    render() {
      return (
        <WrappedComponent {...this.state} />
      );
    }
  }

  return Subscribe;
}
