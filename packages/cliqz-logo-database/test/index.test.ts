import logoDatabase from '../src/db.json';
import getLogo, { defaultDatabase } from '../src/index';
import logo from '../src/logo';

describe('export default', () => {
  it('is getLogo function', () => {
    expect(getLogo).toEqual(logo);
  });
});

describe('export defaultDatabase', () => {
  it('is logo database', () => {
    expect(defaultDatabase).toEqual(logoDatabase);
  });
});
