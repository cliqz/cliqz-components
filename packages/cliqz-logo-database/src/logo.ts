import { parse } from 'tldts';
import defaultDatabase, { Color } from './logo-database';

interface LogoDetails {
  text?: string;
  color?: Color;
  url?: string;
}

export default function(
  url: string,
  { database = defaultDatabase, version = 1580718466960 } = {},
): LogoDetails | null {
  const { hostname, domain, publicSuffix, isIp } = parse(url);

  if (isIp) {
    return {
      color: '9077e3',
      text: 'IP',
    };
  }

  if (!domain || !publicSuffix || !hostname) {
    return null;
  }

  const generalDomainMinusTLD = domain.slice(0, -publicSuffix.length - 1);
  const base = generalDomainMinusTLD || hostname;
  const baseCore = base.replace(/[-]/g, '');
  const check = (host: string, rule: string) => {
    const address = host.lastIndexOf(base);
    const parseddomain = `${host.substr(0, address)}$${host.substr(
      address + base.length,
    )}`;
    return parseddomain.indexOf(rule) !== -1;
  };
  const text = `${baseCore[0] || ''}${baseCore[1] || ''}`.toLowerCase();

  if (database.domains[base]) {
    let logoDetails = null;
    for (let i = 0; i <= database.domains[base].length - 1; i += 1) {
      // r = rule, b = background-color, l = logo, t = text, c = color
      const rule = database.domains[base][i];
      logoDetails = {
        color: rule.b,
        text,
        url: `https://cdn.cliqz.com/brands-database/database/${version}/logos/${base}/${rule.r}.svg`,
      };
      if (check(hostname, rule.r)) {
        return logoDetails;
      }
    }

    // if no rule matched, take the last logoDetails
    if (logoDetails) {
      return logoDetails;
    }
  }

  // default icon with text
  return {
    color:
      database.palette[
        base.split('').reduce((a, b) => a + b.charCodeAt(0), 0) %
          database.palette.length
      ],
    text,
  };
}
