"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfrastructureView = exports.INFRASTRUCTURE_TYPE = void 0;
var basic_1 = require("../basic");
exports.INFRASTRUCTURE_TYPE = "infrastructure";
function getInfrastructureView(titleId, contentId, typeId, infrastructureSDO) {
    document.getElementById(titleId).innerHTML += infrastructureSDO.name;
    document.getElementById(typeId).innerHTML += "Infrastructure";
    var el = document.getElementById(contentId);
    var infrastructureDIV = document.createElement("div");
    infrastructureDIV.id = "infrastructure";
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.aliases)
        basic_1.addNodeViewTextList(infrastructureDIV, infrastructureSDO.aliases);
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.description)
        basic_1.addNodeViewText(infrastructureDIV, infrastructureSDO.description);
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.infrastructure_types)
        basic_1.addNodeViewTitleAndTextList(infrastructureDIV, "Infrastructure types:", infrastructureSDO.infrastructure_types, "badge-dark");
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.first_seen)
        basic_1.addNodeViewTitleAndText(infrastructureDIV, "First seen: ", new Date(infrastructureSDO.first_seen).toString());
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.last_seen)
        basic_1.addNodeViewTitleAndText(infrastructureDIV, "Last seen: ", new Date(infrastructureSDO.last_seen).toString());
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.kill_chain_phases)
        basic_1.addKillChainPhases(infrastructureDIV, infrastructureSDO.kill_chain_phases);
    el.appendChild(infrastructureDIV);
    basic_1.customFieldView(infrastructureDIV.id, infrastructureSDO);
    if (infrastructureSDO === null || infrastructureSDO === void 0 ? void 0 : infrastructureSDO.external_references) {
        basic_1.externalReferencesView(infrastructureDIV.id, infrastructureSDO.external_references);
    }
}
exports.getInfrastructureView = getInfrastructureView;
