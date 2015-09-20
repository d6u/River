export default function createAction(subject) {
  return (value) => {
    subject.onNext(value);
  };
}
