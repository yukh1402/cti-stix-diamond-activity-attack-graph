import {
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  customFieldView
} from '../basic.js';

export const FILE_TYPE = "file";

export function getFileView(titleId, contentId, typeId, fileSCO) {
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
