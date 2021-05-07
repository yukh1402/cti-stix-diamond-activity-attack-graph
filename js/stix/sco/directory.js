import {addNodeViewTitleAndText, customFieldView} from "../basic.js";

export const DIRECTORY_TYPE = "directory";

export function getDirectoryView(titleId, contentId, typeId, directorySCO) {
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
