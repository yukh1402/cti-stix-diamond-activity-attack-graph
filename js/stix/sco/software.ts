import {BasicSTIX, STIXField} from '../basic';

export const SOFTWARE_SCO_FIELDS: STIXField [] = [
  {key: 'name', viewValue: 'Name', type: 'software', typeName: 'Software SCO'},
  {key: 'vendor', viewValue: 'Vendor', type: 'software', typeName: 'Software SCO'},
  {key: 'version', viewValue: 'Version', type: 'software', typeName: 'Software SCO'},
  {key: 'swid', viewValue: 'SWID', type: 'software', typeName: 'Software SCO'}
];

export interface SoftwareSCO extends BasicSTIX {
  name: string;
  vendor?: string;
  swid?: string;
  version?: string;
}
