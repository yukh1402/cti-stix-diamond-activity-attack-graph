import {BasicSTIX, STIXField} from '../basic';

export const IPV4_SCO_FIELDS: STIXField [] = [
  {key: 'x_ip', viewValue: 'IPv4 Address', type: 'ipv4-addr', typeName: 'IPv4 SCO'}
];

export const IPV6_SCO_FIELDS: STIXField [] = [
  {key: 'x_ip', viewValue: 'IPv6 Address', type: 'ipv6-addr', typeName: 'IPv6 SCO'}
];

export interface IPv4SCO extends BasicSTIX {
  x_ip: string;
}

export interface IPv6SCO extends BasicSTIX {
  x_ip: string;
}
