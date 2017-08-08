import { expect } from 'chai';
import getLogo from '../logo';

const fakeDatabase = {
  domains: {
    'cliqz': [{
      r: '$',
      b: '111111',
    }],
  },
};

let subject;

describe('getLogo', function () {
  context('with simple pattern', function () {
    beforeEach(function () {
      subject = getLogo('https://cliqz.com', {
        database: fakeDatabase,
      });
    });

    it('returns color', function () {
      expect(subject)
        .to.have.property('color')
        .that.equal(fakeDatabase.domains.cliqz[0].b);
    });

    it('return logoUrl', function () {
      expect(subject)
        .to.have.property('logoUrl')
        .that.equal(`https://cdn.cliqz.com/brands-database/database/${fakeDatabase.__version}/logos/cliqz/$.svg`);
    });
  });
});
