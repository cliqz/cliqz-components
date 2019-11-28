import { merge } from '../src/index';

describe('@cliqz/component-styles', () => {
  describe('merge', () => {
    it('combine two styles', () => {
      const base = {
        container: {
          margin: 2,
        },
        text: {
          color: 'black',
        },
      };

      expect(
        merge(base, {
          container: {
            margin: 5,
          },
        }),
      ).toEqual({
        container: {
          margin: 5,
        },
        text: {
          color: 'black',
        },
      });
    });
  });
});
