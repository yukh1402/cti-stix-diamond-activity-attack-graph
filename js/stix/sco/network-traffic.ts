import {BasicSTIX, STIXField} from '../basic';

export const NETWORK_TRAFFIC_TYPE = "network-traffic";

export const NETWORK_TRAFFIC_SCO_FIELDS: STIXField [] = [
  {key: 'start', viewValue: 'Start time', type: 'network-traffic', typeName: 'Network Traffic SCO'},
  {key: 'src_port', viewValue: 'Source port', type: 'network-traffic', typeName: 'Network Traffic SCO'},
  {key: 'src_ref', viewValue: 'Source IP', type: 'ipv', typeName: 'Network Traffic SCO'},
  {key: 'dst_port', viewValue: 'Destination port', type: 'network-traffic', typeName: 'Network Traffic SCO'},
  {key: 'dst_ref', viewValue: 'Destination IP', type: 'ipv', typeName: 'Network Traffic SCO'},
  {key: 'protocols', viewValue: 'Protocols', type: 'network-traffic', typeName: 'Network Traffic SCO'},
  {key: 'x_direction', viewValue: 'Direction', type: 'network-traffic', typeName: 'Network Traffic SCO'}
];

export interface NetworkTrafficSCO extends BasicSTIX {
  src_ref: string;
  dst_ref: string;
  dst_port: number;
  src_port: number;
  x_direction: string;
  start: Date;
  protocols: string [];
  x_guid: string;
}
