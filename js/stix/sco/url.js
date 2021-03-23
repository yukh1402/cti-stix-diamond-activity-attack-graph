"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlView = exports.URL_TYPE = void 0;
var basic_1 = require("../basic");
exports.URL_TYPE = "url";
function getUrlView(titleId, contentId, typeId, urlSCO) {
    document.getElementById(titleId).innerHTML += urlSCO.value;
    document.getElementById(typeId).innerHTML += "Url";
    var el = document.getElementById(contentId);
    var urlDIV = document.createElement("div");
    urlDIV.id = exports.URL_TYPE;
    el.appendChild(urlDIV);
    basic_1.customFieldView(urlDIV.id, urlSCO);
}
exports.getUrlView = getUrlView;
