"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainView = exports.DOMAIN_TYPE = void 0;
var basic_1 = require("../basic");
exports.DOMAIN_TYPE = "domain-name";
function getDomainView(titleId, contentId, typeId, domainSCO) {
    document.getElementById(titleId).innerHTML += domainSCO.value;
    document.getElementById(typeId).innerHTML += "Domain Name";
    var el = document.getElementById(contentId);
    var domainDIV = document.createElement("div");
    domainDIV.id = exports.DOMAIN_TYPE;
    el.appendChild(domainDIV);
    basic_1.customFieldView(domainDIV.id, domainSCO);
}
exports.getDomainView = getDomainView;
