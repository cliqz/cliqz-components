import getLogo from '../src/logo';
import { LogoDatabase } from '../src/logo-database';

const fakeDatabaseVersion = 1345;
const fakeDatabase: LogoDatabase = {
  buttons: [],
  domains: {
    cliqz: [
      {
        b: '111111',
        l: 1,
        r: '$',
      },
    ],
    eff: [
      {
        b: '111111',
        l: 1,
        r: '$',
      },
      {
        b: '222222',
        l: 1,
        r: '$.org',
      },
      {
        b: '333333',
        l: 1,
        r: '$.com',
      },
    ],
    mozilla: [
      {
        b: '111111',
        l: 1,
        r: '',
      },
      {
        b: '222222',
        l: 1,
        r: '',
      },
    ],
  },
  palette: ['000000', '110000', '001100', '000011', '111111'],
};

let subject: any;

describe('getLogo', () => {
  describe('handles IPs', () => {
    beforeEach(() => {
      subject = getLogo('http://192.168.0.1', {
        database: fakeDatabase,
        version: fakeDatabaseVersion,
      });
    });

    it('return a valid logo object', () => {
      expect(subject).toHaveProperty('color');
      expect(subject).toHaveProperty('text', 'IP');
    });
  });

  describe('with simple pattern', () => {
    beforeEach(() => {
      subject = getLogo('https://cliqz.com', {
        database: fakeDatabase,
        version: fakeDatabaseVersion,
      });
    });

    it('returns color', () => {
      expect(subject).toHaveProperty('color', fakeDatabase.domains.cliqz[0].b);
    });

    it('return logo url', () => {
      expect(subject).toHaveProperty(
        'url',
        `https://cdn.cliqz.com/brands-database/database/${fakeDatabaseVersion}/logos/cliqz/$.svg`,
      );
    });
  });

  describe('with multiple patterns', () => {
    beforeEach(() => {
      subject = getLogo('https://eff.org', {
        database: fakeDatabase,
      });
    });

    it('uses matching rule', () => {
      expect(subject).toHaveProperty('color', fakeDatabase.domains.eff[1].b);
    });
  });

  describe('with rules but not matching pattern', () => {
    beforeEach(() => {
      subject = getLogo('https://mozilla.com', {
        database: fakeDatabase,
      });
    });

    it('uses last rule', () => {
      expect(subject).toHaveProperty(
        'color',
        fakeDatabase.domains.mozilla[1].b,
      );
    });
  });

  describe('with no rules', () => {
    beforeEach(() => {
      subject = getLogo('https://xyz.com', {
        database: fakeDatabase,
      });
    });

    it('returns only text', () => {
      expect(subject).toEqual({ color: '000011', text: 'xy' });
    });
  });
});
