"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileView = exports.FILE_SCO_FIELDS = exports.FILE_TYPE = void 0;
var basic_1 = require("../basic");
exports.FILE_TYPE = "file";
exports.FILE_SCO_FIELDS = [
    { key: 'name', viewValue: 'Name', type: 'file', typeName: 'File SCO' },
    { key: 'hashes.SHA-1', viewValue: 'SHA-1', type: 'file', typeName: 'File SCO' },
    { key: 'hashes.SHA-256', viewValue: 'SHA-256', type: 'file', typeName: 'File SCO' },
    { key: 'hashes.MD5', viewValue: 'MD5', type: 'file', typeName: 'File SCO' },
    { key: 'extensions.windows-pebinary-ext.imphash', viewValue: 'IMPHASH', type: 'file', typeName: 'File SCO' },
    { key: 'extensions.windows-pebinary-ext.pe_type', viewValue: 'Portable Executable type', type: 'file', typeName: 'File SCO' }
];
function getFileView(titleId, contentId, typeId, fileSCO) {
    document.getElementById(titleId).innerHTML += fileSCO.name;
    document.getElementById(typeId).innerHTML += "File";
    var el = document.getElementById(contentId);
    var fileDIV = document.createElement("div");
    fileDIV.id = "file";
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.name_enc)
        basic_1.addNodeViewTitleAndText(fileDIV, "Encoding", fileSCO.name_enc);
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.hashes) {
        var hashObj = fileSCO.hashes;
        var hashes = [];
        if (hashObj === null || hashObj === void 0 ? void 0 : hashObj.MD5)
            hashes.push("MD5 | " + hashObj.MD5);
        if (hashObj === null || hashObj === void 0 ? void 0 : hashObj["SHA-1"])
            hashes.push("SHA-1 | " + hashObj["SHA-1"]);
        if (hashObj === null || hashObj === void 0 ? void 0 : hashObj["SHA-256"])
            hashes.push("SHA-256 | " + hashObj["SHA-256"]);
        basic_1.addNodeViewTitleAndTextList(fileDIV, "Hashes:", hashes, "badge-dark");
    }
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.size)
        basic_1.addNodeViewTitleAndText(fileDIV, "Size:", fileSCO.size.toString());
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.magic_number_hex)
        basic_1.addNodeViewTitleAndText(fileDIV, "Magic number hex:", fileSCO.magic_number_hex);
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.mime_type)
        basic_1.addNodeViewTitleAndText(fileDIV, "Mime type:", fileSCO.mime_type);
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.ctime)
        basic_1.addNodeViewTitleAndText(fileDIV, "Create time:", fileSCO.ctime);
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.mtime)
        basic_1.addNodeViewTitleAndText(fileDIV, "Modification time:", fileSCO.mtime);
    if (fileSCO === null || fileSCO === void 0 ? void 0 : fileSCO.atime)
        basic_1.addNodeViewTitleAndText(fileDIV, "Last access time:", fileSCO.atime);
    el.appendChild(fileDIV);
    basic_1.customFieldView(fileDIV.id, fileSCO);
}
exports.getFileView = getFileView;
