import { getDomain, getPublicSuffix } from 'tldjs';
import defaultDatabase from './logo-database.json';

const findRule = (database, name) => {
  const rules = database.domains[name];
  return rules[0];
};

export default function (url, { database = defaultDatabase } = {}) {
  const publicSuffix = getPublicSuffix(url);
  const domain = getDomain(url);
  const base = domain.substring(0, domain.length - publicSuffix.length - 1);
  const rule = findRule(database, base);

  /* eslint-disable */
  const version = database.__version;
  /* eslint-enable */

  const logoUrl = `https://cdn.cliqz.com/brands-database/database/${version}/logos/${base}/${rule.r}.svg`;
  const color = rule.b;

  return {
    logoUrl,
    color,
  };
}
