import {BasicSTIX, STIXField} from '../basic';

export const DIRECTORY_SCO_FIELDS: STIXField [] = [
  {key: 'path', viewValue: 'Path', type: 'directory', typeName: 'Directory SCO'}
];

export interface DirectorySCO extends BasicSTIX {
  path: string;
}
