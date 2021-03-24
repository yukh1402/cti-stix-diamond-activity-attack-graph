"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteView = exports.NOTE_TYPE = void 0;
var basic_1 = require("../basic");
exports.NOTE_TYPE = "note";
function getNoteView(titleId, contentId, typeId, noteSDO) {
    document.getElementById(titleId).innerHTML += noteSDO.content.length > 20 ?
        noteSDO.content.slice(0, 20) + "..." : noteSDO.content;
    document.getElementById(typeId).innerHTML += "Note";
    var el = document.getElementById(contentId);
    var noteDIV = document.createElement("div");
    noteDIV.id = "note";
    if (noteSDO === null || noteSDO === void 0 ? void 0 : noteSDO.content)
        basic_1.addNodeViewText(noteDIV, noteSDO.content);
    if (noteSDO === null || noteSDO === void 0 ? void 0 : noteSDO.abstract)
        basic_1.addNodeViewTitleAndText(noteDIV, "Abstract:", noteSDO.abstract);
    if (noteSDO === null || noteSDO === void 0 ? void 0 : noteSDO.authors)
        basic_1.addNodeViewTitleAndTextList(noteDIV, "Authors:", noteSDO.authors, "badge-dark");
    el.appendChild(noteDIV);
    basic_1.customFieldView(noteDIV.id, noteSDO);
    if (noteSDO === null || noteSDO === void 0 ? void 0 : noteSDO.external_references) {
        basic_1.externalReferencesView(noteDIV.id, noteSDO.external_references);
    }
}
exports.getNoteView = getNoteView;
