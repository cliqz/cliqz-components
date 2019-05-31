import database, { Rule } from '../src/logo-database';

describe('database', () => {
  it('has domains', () => {
    expect(database).toHaveProperty('domains');
    expect(database.domains).toBeInstanceOf(Object);
  });

  it('has buttons', () => {
    expect(database).toHaveProperty('buttons');
    expect(database.buttons).toBeInstanceOf(Array);
  });

  it('has palette', () => {
    expect(database).toHaveProperty('palette');
    expect(database.palette).toBeInstanceOf(Array);
  });

  it('buttons and palette has same size', () => {
    expect(database.buttons.length).toEqual(database.palette.length);
  });

  describe('rules', () => {
    const rules = Object.keys(database.domains)
      .filter((d) => database.domains[d].length > 0)
      .reduce(
        (all: Array<{ domain: string; rule: Rule }>, d: string) => [
          ...all,
          ...database.domains[d].map((rule) => ({ domain: d, rule })),
        ],
        [],
      );

    rules.forEach(({ domain, rule }: { domain: string; rule: any }) => {
      describe(`doamin "${domain}" with rule "${rule.r}"`, () => {
        it('has pattern aliased as r', () => {
          expect(rule).toHaveProperty('r');
          expect(rule.r).toContain('$');
        });

        describe('has color', () => {
          it('is hexadecimal', () => {
            if (!rule.b) {
              // TODO: verify if can be empty
            } else if (rule.b.length === 6) {
              expect(rule.b).toMatch(/[0-9a-fA-F]{6}/);
            } else if (rule.b.length === 3) {
              expect(rule.b).toMatch(/[0-9a-fA-F]{3}/);
            }
          });

          // TODO: verify if this is true
          xit('comes from palette', () => {
            expect(database.palette).toContain(rule.b);
          });
        });
      });
    });
  });
});
