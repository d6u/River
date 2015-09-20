export function createStore(factory) {
  const stream = factory().replay(null, 1);
  stream.connect();
  return stream;
}
