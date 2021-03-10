import {BasicSTIX, STIXField} from '../basic';

export const FILE_SCO_FIELDS: STIXField [] = [
  {key: 'name', viewValue: 'Name', type: 'file', typeName: 'File SCO'},
  {key: 'hashes.SHA-1', viewValue: 'SHA-1', type: 'file', typeName: 'File SCO'},
  {key: 'hashes.SHA-256', viewValue: 'SHA-256', type: 'file', typeName: 'File SCO'},
  {key: 'hashes.MD5', viewValue: 'MD5', type: 'file', typeName: 'File SCO'},
  {key: 'extensions.windows-pebinary-ext.imphash', viewValue: 'IMPHASH', type: 'file', typeName: 'File SCO'},
  {key: 'extensions.windows-pebinary-ext.pe_type', viewValue: 'Portable Executable type', type: 'file', typeName: 'File SCO'}
];

export interface WindowsPEBinary {
  pe_type?: string;
  imphash?: string;
}

export interface WindowsPEBinaryExt {
  'windows-pebinary-ext': WindowsPEBinary
}

export interface Hash {
  'SHA-1'?: string;
  'SHA-256'?: string;
  MD5?: string;
}

export interface FileSCO extends BasicSTIX {
  name: string;
  parent_directory_ref?: string;
  hashes: Hash;
  extensions: WindowsPEBinaryExt
}
