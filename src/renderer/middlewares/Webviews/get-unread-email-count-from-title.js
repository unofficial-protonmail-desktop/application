export default title =>
  title.search(/inbox/i) === -1
    ? null
    : +title
      .split(/inbox/i)
      .shift()
      .replace(/\s/, '')
      .match(/[0-9]{1,}/);
