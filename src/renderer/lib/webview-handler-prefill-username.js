export default function(username) {
  const watcher = setInterval(() => {
    const elem = document.querySelector('[name=username]');

    if (!elem) return;

    elem.value = username;
    clearInterval(watcher);
  }, 100);
}
