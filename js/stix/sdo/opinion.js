"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpinionView = exports.OPINION_TYPE = void 0;
var basic_1 = require("../basic");
exports.OPINION_TYPE = "opinion";
function getOpinionView(titleId, contentId, typeId, opinionSDO) {
    document.getElementById(titleId).innerHTML += opinionSDO.opinion;
    document.getElementById(typeId).innerHTML += "Opinion";
    var el = document.getElementById(contentId);
    var opinionDIV = document.createElement("div");
    opinionDIV.id = "opinion";
    if (opinionSDO === null || opinionSDO === void 0 ? void 0 : opinionSDO.explanation)
        basic_1.addNodeViewTitleAndText(opinionDIV, "Explanation:", opinionSDO.explanation);
    if (opinionSDO === null || opinionSDO === void 0 ? void 0 : opinionSDO.authors)
        basic_1.addNodeViewTitleAndTextList(opinionDIV, "Authors:", opinionSDO.authors, "badge-dark");
    el.appendChild(opinionDIV);
    basic_1.customFieldView(opinionDIV.id, opinionSDO);
    if (opinionSDO === null || opinionSDO === void 0 ? void 0 : opinionSDO.external_references) {
        basic_1.externalReferencesView(opinionDIV.id, opinionSDO.external_references);
    }
}
exports.getOpinionView = getOpinionView;
