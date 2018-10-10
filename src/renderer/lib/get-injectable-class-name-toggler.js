const getStatements = classNames => {
  const baseObj = 'document.documentElement.classList';

  return Object.keys(classNames)
    .map(className => {
      if (classNames[className] === true) {
        return baseObj.concat(`.add("${className}");`);
      }

      if (classNames[className] === false) {
        return baseObj.concat(`.remove("${className}");`);
      }

      throw Error(`Bad className value sent for ${className}: ${classNames[className]}`);
    })
    .join('');
};


export default classNames => {
  return '(() => { '.concat(getStatements(classNames), '})()');
};
