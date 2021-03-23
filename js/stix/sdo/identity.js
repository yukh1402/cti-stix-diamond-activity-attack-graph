"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdentityView = exports.IDENTITY_SDO_FIELDS = exports.IDENTITY_TYPE = void 0;
var basic_1 = require("../basic");
exports.IDENTITY_TYPE = "identity";
exports.IDENTITY_SDO_FIELDS = [
    { key: "name", viewValue: "Hostname", type: 'identity', typeName: 'Identity SDO' },
    { key: "x_dns_hostname", viewValue: "DNS Hostname", type: 'identity', typeName: 'Identity SDO' },
    { key: "x_os_product_name", viewValue: "OS", type: 'identity', typeName: 'Identity SDO' },
    { key: "x_os_architecture", viewValue: "OS architecture", type: 'identity', typeName: 'Identity SDO' },
    { key: "x_os_timezone", viewValue: "OS timezone", type: 'identity', typeName: 'Identity SDO' }
];
function getIdentityView(titleId, contentId, typeId, identitySDO) {
    document.getElementById(titleId).innerHTML += identitySDO.name;
    document.getElementById(typeId).innerHTML += "Identity";
    var el = document.getElementById(contentId);
    var identityDIV = document.createElement("div");
    identityDIV.id = "identity";
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.description)
        basic_1.addNodeViewText(identityDIV, identitySDO.description);
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.roles)
        basic_1.addNodeViewTitleAndTextList(identityDIV, "Roles:", identitySDO.roles, "badge-dark");
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.sectors)
        basic_1.addNodeViewTitleAndTextList(identityDIV, "Sectors:", identitySDO.sectors, "badge-dark");
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.identity_class)
        basic_1.addNodeViewTitleAndText(identityDIV, "Identity class:", identitySDO.identity_class);
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.contact_information)
        basic_1.addNodeViewTitleAndText(identityDIV, "Contact Information:", identitySDO.contact_information);
    el.appendChild(identityDIV);
    basic_1.customFieldView(identityDIV.id, identitySDO);
    if (identitySDO === null || identitySDO === void 0 ? void 0 : identitySDO.external_references) {
        basic_1.externalReferencesView(identityDIV.id, identitySDO.external_references);
    }
}
exports.getIdentityView = getIdentityView;
