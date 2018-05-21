export default function statePersistMiddleware({ getState }) {
  return next => action => {
    const result = next(action);

    window.localStorage.setItem('appState', JSON.stringify(getState()));

    return result;
  };
}
