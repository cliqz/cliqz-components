import { expect } from 'chai';
import database from '../logo-database';

describe('database', function () {
  it('has domains', function () {
    expect(database).to.have.property('domains');
    expect(database.domains).to.be.instanceOf(Object);
  });

  it('has buttons', function () {
    expect(database).to.have.property('buttons');
    expect(database.buttons).to.be.instanceOf(Array);
  });

  it('has palette', function () {
    expect(database).to.have.property('palette');
    expect(database.palette).to.be.instanceOf(Array);
  });

  it('buttons and palette has same size', function () {

    expect(database.buttons.length).to.equal(database.palette.length);
  });

  describe('rules', function () {
    const rules = Object.keys(database.domains)
      .filter(d => database.domains[d].length > 0)
      .reduce((all, d) => ([
        ...all,
        ...database.domains[d].map(rule => ({ domain: d, rule }))
      ]), []);

    rules.forEach(({ domain, rule }) => {
      context(`doamin "${domain}" with rule "${rule.r}"`, function () {
        it('has pattern aliased as r', function () {
          expect(rule)
            .to.have.property('r')
            .that.is.a('String')
            .that.contains('$')
            .that.have.lengthOf.above(0);
        });

        describe('has color', function () {

          it('is hexadecimal', function () {
            if (!rule.b) {
              // TODO: verify if can be empty
            } else if (rule.b.length === 6) {
              expect(rule.b).to.match(/[0-9a-fA-F]{6}/);
            } else if (rule.b.length === 3) {
              expect(rule.b).to.match(/[0-9a-fA-F]{3}/);
            }
          });

          // TODO: verify if this is true
          xit('comes from palette', function () {
            expect(database.palette).to.include(rule.b);
          });
        });
      });
    });

  });

});
