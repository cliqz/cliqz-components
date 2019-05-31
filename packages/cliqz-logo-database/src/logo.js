import { parse } from 'tldts';
import defaultDatabase from './logo-database';
export default function (url, { database = defaultDatabase, version = 1502005705085 } = {}) {
    const { hostname, domain, publicSuffix, isIp } = parse(url);
    if (!domain || !publicSuffix || !hostname) {
        return null;
    }
    const generalDomainMinusTLD = domain.slice(0, -publicSuffix.length - 1);
    const base = generalDomainMinusTLD || hostname;
    const baseCore = base.replace(/[-]/g, '');
    const check = (host, rule) => {
        const address = host.lastIndexOf(base);
        const parseddomain = `${host.substr(0, address)}$${host.substr(address + base.length)}`;
        return parseddomain.indexOf(rule) !== -1;
    };
    if (isIp) {
        return {
            color: '9077e3',
            text: 'IP',
        };
    }
    else if (database.domains[base]) {
        for (let i = 0, imax = database.domains[base].length; i < imax; i += 1) {
            const rule = database.domains[base][i];
            if (check(hostname, rule.r)) {
                return {
                    color: rule.b,
                    logoUrl: `https://cdn.cliqz.com/brands-database/database/${version}/logos/${base}/${rule.r}.svg`,
                    text: `${baseCore[0] || ''}${baseCore[1] || ''}`.toLowerCase(),
                };
            }
        }
    }
    return null;
}
