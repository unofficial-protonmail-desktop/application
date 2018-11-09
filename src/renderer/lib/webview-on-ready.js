export default (webview, callback) => {
  const execJs = () => {
    callback();
    webview.removeEventListener('dom-ready', execJs);
  };

  try {
    // This will throw an error if we're here before the element is properly
    // attached to the DOM.
    webview.isLoading();
    callback();
  } catch (error) {
    webview.addEventListener('dom-ready', execJs);
  }
};
