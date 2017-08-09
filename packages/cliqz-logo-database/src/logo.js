import { getDomain, getPublicSuffix } from 'tldjs';
import defaultDatabase from './logo-database.json';

const parseUrl = (url) => {
  const publicSuffix = getPublicSuffix(url);
  const hostname = getDomain(url);

  const base = hostname.substring(0, hostname.length - publicSuffix.length - 1);
  const baseIndex = hostname.lastIndexOf(base);
  const prefix = hostname.substr(0, baseIndex);
  const postfix = hostname.substr(baseIndex + base.length);
  const pattern = `${prefix}$${postfix}`;

  return {
    base,
    pattern,
  };
};

const findRule = (database, base, pattern) => {
  const rules = database.domains[base] || [];
  let rule = rules.find(({ r }) => r === pattern);

  if (rules.length === 1) {
    rule = rules[0];
  } else if (!rule) {
    rule = rules[rules.length - 1];
  }

  return rule;
};

export default function (url, { database = defaultDatabase } = {}) {
  /* eslint-disable */
  const version = database.__version;
  /* eslint-enable */

  const { base, pattern } = parseUrl(url);
  const rule = findRule(database, base, pattern);

  if (!rule) {
    return null;
  }

  return {
    logoUrl: `https://cdn.cliqz.com/brands-database/database/${version}/logos/${base}/${rule.r}.svg`,
    color: rule.b,
  };
}
