import {
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSTIX,
  customFieldView,
  STIXField
} from '../basic';

export const FILE_TYPE = "file";

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
  hashes?: Hash;
  size?: number;
  name?: string;
  name_enc?: string;
  magic_number_hex?: string;
  mime_type?: string;
  ctime?: string //timestamp
  mtime?: string //timestamp
  atime?: string //timestamp
  parent_directory_ref?: string;
  contains_refs?: string [];
  content_ref?: string;
  extensions?: {}
}

export function getFileView(titleId: string, contentId: string, typeId: string, fileSCO: FileSCO) {
  document.getElementById(titleId).innerHTML += fileSCO.name;
  document.getElementById(typeId).innerHTML += "File";

  let el = document.getElementById(contentId);
  const fileDIV = document.createElement("div");
  fileDIV.id = "file";

  if (fileSCO?.name_enc) addNodeViewTitleAndText(fileDIV, "Encoding", fileSCO.name_enc);
  if (fileSCO?.hashes) {
    const hashObj = fileSCO.hashes;
    let hashes = [];
    if (hashObj?.MD5) hashes.push("MD5 | " + hashObj.MD5);
    if (hashObj?.["SHA-1"]) hashes.push("SHA-1 | " + hashObj["SHA-1"]);
    if (hashObj?.["SHA-256"]) hashes.push("SHA-256 | " + hashObj["SHA-256"]);
    addNodeViewTitleAndTextList(fileDIV, "Hashes:", hashes, "badge-dark");
  }
  if (fileSCO?.size) addNodeViewTitleAndText(fileDIV, "Size:", fileSCO.size.toString());
  if (fileSCO?.magic_number_hex) addNodeViewTitleAndText(fileDIV, "Magic number hex:",
    fileSCO.magic_number_hex);
  if (fileSCO?.mime_type) addNodeViewTitleAndText(fileDIV, "Mime type:",
    fileSCO.mime_type);
  if (fileSCO?.ctime) addNodeViewTitleAndText(fileDIV, "Create time:", fileSCO.ctime);
  if (fileSCO?.mtime) addNodeViewTitleAndText(fileDIV, "Modification time:", fileSCO.mtime);
  if (fileSCO?.atime) addNodeViewTitleAndText(fileDIV, "Last access time:", fileSCO.atime);

  el.appendChild(fileDIV);
  customFieldView(fileDIV.id, fileSCO);
}
