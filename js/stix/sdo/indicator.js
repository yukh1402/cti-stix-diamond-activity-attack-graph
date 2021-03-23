"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndicatorView = exports.INDICATOR_TYPE = void 0;
var basic_1 = require("../basic");
exports.INDICATOR_TYPE = "indicator";
function getIndicatorView(titleId, contentId, typeId, indicatorSDO) {
    document.getElementById(titleId).innerHTML += indicatorSDO.name;
    document.getElementById(typeId).innerHTML += "Indicator";
    var el = document.getElementById(contentId);
    var indicatorDIV = document.createElement("div");
    indicatorDIV.id = "indicator";
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.description)
        basic_1.addNodeViewText(indicatorDIV, indicatorSDO.description);
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.indicator_types)
        basic_1.addNodeViewTitleAndTextList(indicatorDIV, "Indicator types:", indicatorSDO.indicator_types, "badge-dark");
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.pattern)
        basic_1.addNodeViewTitleAndText(indicatorDIV, "Pattern:", indicatorSDO.pattern);
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.pattern_type)
        basic_1.addNodeViewTitleAndText(indicatorDIV, "Type:", indicatorSDO.pattern_type);
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.pattern_version)
        basic_1.addNodeViewTitleAndText(indicatorDIV, "Version:", indicatorSDO.pattern_version);
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.valid_from)
        basic_1.addNodeViewTitleAndText(indicatorDIV, "Valid from:", new Date(indicatorSDO.valid_from).toString());
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.valid_until)
        basic_1.addNodeViewTitleAndText(indicatorDIV, "Valid unti:", new Date(indicatorSDO.valid_until).toString());
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.kill_chain_phases)
        basic_1.addKillChainPhases(indicatorDIV, indicatorSDO.kill_chain_phases);
    el.appendChild(indicatorDIV);
    basic_1.customFieldView(indicatorDIV.id, indicatorSDO);
    if (indicatorSDO === null || indicatorSDO === void 0 ? void 0 : indicatorSDO.external_references) {
        basic_1.externalReferencesView(indicatorDIV.id, indicatorSDO.external_references);
    }
}
exports.getIndicatorView = getIndicatorView;
