import { expect } from 'chai';
import getLogo from '../logo';

const fakeDatabase = {
  __version: '124',
  domains: {
    'cliqz': [{
      r: '$',
      b: '111111',
    }],
    'mozilla': [{
      r: '',
      b: '111111',
    }, {
      r: '',
      b: '222222',
    }],
    'eff': [{
      r: '$',
      b: '111111',
    }, {
      r: '$.org',
      b: '222222',
    }, {
      r: '$.com',
      b: '333333',
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

  context('with multiple patterns', function () {
    beforeEach(function () {
      subject = getLogo('https://eff.org', {
        database: fakeDatabase,
      });
    });

    it('uses matching rule', function () {
      expect(subject)
        .to.have.property('color')
        .that.equal(fakeDatabase.domains.eff[1].b);
    });
  });

  context('with rules but not matching pattern', function () {
    beforeEach(function () {
      subject = getLogo('https://mozilla.com', {
        database: fakeDatabase,
      });
    });

    it('uses last rule', function () {
      expect(subject)
        .to.have.property('color')
        .that.equal(fakeDatabase.domains.mozilla[1].b);
    });
  });

  context('with no rules', function () {
    beforeEach(function () {
      subject = getLogo('https://xyz.com', {
        database: fakeDatabase,
      });
    });

    it('returns null', function () {
      expect(subject).to.be.null;
    });
  });
});
