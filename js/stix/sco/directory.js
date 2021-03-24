"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectoryView = exports.DIRECTORY_SCO_FIELDS = exports.DIRECTORY_TYPE = void 0;
var basic_1 = require("../basic");
exports.DIRECTORY_TYPE = "directory";
exports.DIRECTORY_SCO_FIELDS = [
    { key: 'path', viewValue: 'Path', type: 'directory', typeName: 'Directory SCO' }
];
function getDirectoryView(titleId, contentId, typeId, directorySCO) {
    document.getElementById(titleId).innerHTML += directorySCO.path;
    document.getElementById(typeId).innerHTML += "Directory";
    var el = document.getElementById(contentId);
    var directoryIV = document.createElement("div");
    directoryIV.id = "directory";
    if (directorySCO === null || directorySCO === void 0 ? void 0 : directorySCO.path_enc)
        basic_1.addNodeViewTitleAndText(directoryIV, "Encoding", directorySCO.path_enc);
    if (directorySCO === null || directorySCO === void 0 ? void 0 : directorySCO.ctime)
        basic_1.addNodeViewTitleAndText(directoryIV, "Create time:", directorySCO.ctime);
    if (directorySCO === null || directorySCO === void 0 ? void 0 : directorySCO.mtime)
        basic_1.addNodeViewTitleAndText(directoryIV, "Modification time:", directorySCO.mtime);
    if (directorySCO === null || directorySCO === void 0 ? void 0 : directorySCO.atime)
        basic_1.addNodeViewTitleAndText(directoryIV, "Last access time:", directorySCO.atime);
    el.appendChild(directoryIV);
    basic_1.customFieldView(directoryIV.id, directorySCO);
}
exports.getDirectoryView = getDirectoryView;
