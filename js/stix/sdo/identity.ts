import {BasicSDOSRO, STIXField, STIXObject} from '../basic';

export const IDENTITY_TYPE = "identity"


export const IDENTITY_SDO_FIELDS: STIXField [] = [
  {key: "name", viewValue: "Hostname", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_dns_hostname", viewValue: "DNS Hostname", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_product_name", viewValue: "OS", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_architecture", viewValue: "OS architecture", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_timezone", viewValue: "OS timezone", type: 'identity', typeName: 'Identity SDO'}
];

export interface IdentitySDO extends BasicSDOSRO {
  description?: string;
  roles?: string [];
  sectors?: string [];
  contact_information: string;
  name: string;
  identity_class?: string;
}
