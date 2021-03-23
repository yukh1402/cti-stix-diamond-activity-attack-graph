import {addNodeViewTitleAndText, BasicSTIX, customFieldView, STIXField} from '../basic';

export const DIRECTORY_TYPE = "directory";

export const DIRECTORY_SCO_FIELDS: STIXField [] = [
  {key: 'path', viewValue: 'Path', type: 'directory', typeName: 'Directory SCO'}
];

export interface DirectorySCO extends BasicSTIX {
  path: string;
  path_enc?: string;
  ctime?: string //timestamp
  mtime?: string //timestamp
  atime?: string //timestamp
  contains_refs?: string [];
}

export function getDirectoryView(titleId: string, contentId: string, typeId: string, directorySCO: DirectorySCO) {
  document.getElementById(titleId).innerHTML += directorySCO.path;
  document.getElementById(typeId).innerHTML += "Directory";

  let el = document.getElementById(contentId);
  const directoryIV = document.createElement("div");
  directoryIV.id = "directory";

  if (directorySCO?.path_enc) addNodeViewTitleAndText(directoryIV, "Encoding",directorySCO.path_enc);
  if (directorySCO?.ctime) addNodeViewTitleAndText(directoryIV, "Create time:", directorySCO.ctime);
  if (directorySCO?.mtime) addNodeViewTitleAndText(directoryIV, "Modification time:", directorySCO.mtime);
  if (directorySCO?.atime) addNodeViewTitleAndText(directoryIV, "Last access time:", directorySCO.atime);

  el.appendChild(directoryIV);
  customFieldView(directoryIV.id, directorySCO);
}
