"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntrusionSetView = exports.INTRUSION_SET_TYPE = void 0;
var basic_1 = require("../basic");
exports.INTRUSION_SET_TYPE = "intrusion-set";
function getIntrusionSetView(titleId, contentId, typeId, intrusionSDO) {
    document.getElementById(titleId).innerHTML += intrusionSDO.name;
    document.getElementById(typeId).innerHTML += "Intrusion Set";
    var el = document.getElementById(contentId);
    var intrusionDIV = document.createElement("div");
    intrusionDIV.id = "intrusion-set";
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.aliases)
        basic_1.addNodeViewTitleAndTextList(intrusionDIV, "Aliases:", intrusionSDO.aliases);
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.description)
        basic_1.addNodeViewTitleAndText(intrusionDIV, "Description:", intrusionSDO.description);
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.first_seen)
        basic_1.addNodeViewTitleAndText(intrusionDIV, "First seen:", new Date(intrusionSDO.first_seen).toString());
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.last_seen)
        basic_1.addNodeViewTitleAndText(intrusionDIV, "Last seen:", new Date(intrusionSDO.last_seen).toString());
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.goals)
        basic_1.addNodeViewTitleAndTextList(intrusionDIV, "Goals:", intrusionSDO.goals, "badge-dark");
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.resource_level)
        basic_1.addNodeViewTitleAndText(intrusionDIV, "Resource level:", intrusionSDO.resource_level);
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.primary_motivation)
        basic_1.addNodeViewTitleAndText(intrusionDIV, "Primary motivation:", intrusionSDO.primary_motivation);
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.secondary_motivations)
        basic_1.addNodeViewTitleAndTextList(intrusionDIV, "Secondary motivations:", intrusionSDO.secondary_motivations, "badge-dark");
    el.appendChild(intrusionDIV);
    basic_1.customFieldView(intrusionDIV.id, intrusionSDO);
    if (intrusionSDO === null || intrusionSDO === void 0 ? void 0 : intrusionSDO.external_references) {
        basic_1.externalReferencesView(intrusionDIV.id, intrusionSDO.external_references);
    }
}
exports.getIntrusionSetView = getIntrusionSetView;
