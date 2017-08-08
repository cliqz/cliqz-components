import { expect } from 'chai';
import logoDatabase from '../logo-database.json';
import logo from '../logo';
import getLogo, { defaultDatabase } from '../index';

describe('export default', function () {
  it('is getLogo function', function () {
    expect(getLogo).to.equal(logo);
  });
});

describe('export defaultDatabase', function () {
  it('is logo database', function () {
    expect(defaultDatabase).to.equal(logoDatabase);
  });
});
