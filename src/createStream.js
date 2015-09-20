export function createStream(factory) {
  return (...deps) => {
    return factory(...deps);
  };
}

export function createReplayStream(factory) {
  return (...deps) => {
    const stream = factory(...deps).replay(null, 1);
    stream.connect();
    return stream;
  };
}

export function createStreamFactory(provider) {
  return (...deps) => {
    return provider(...deps);
  };
}
