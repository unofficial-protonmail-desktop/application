import { expect } from 'chai';
import toggler from './get-injectable-class-name-toggler';

describe('renderer/lib/getInjectableClassNameToggler', () => {
  it('should return a string that will classList.add upon true', () => {
    const className = 'turnMeOn';
    const classNames = {
      [className]: true,
    };

    expect(
      toggler(classNames).indexOf(`document.documentElement.classList.add("${className}")`)
    ).to.be.greaterThan(-1);
    expect(toggler(classNames)).to.not.match(/remove/);

    expect(() => eval(toggler(classNames))).to.not.throw();
  });

  it('should return a string that will classList.remove upon false', () => {
    const className = 'turnMeOff';
    const classNames = {
      [className]: false,
    };

    expect(
      toggler(classNames).indexOf(`document.documentElement.classList.remove("${className}")`)
    ).to.be.greaterThan(-1);

    expect(() => eval(toggler(classNames))).to.not.throw();
  });
});
