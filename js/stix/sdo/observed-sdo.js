"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservedDataView = exports.OBSERVED_SDO_FIELDS = exports.OBSERVED_DATA_TYPE = void 0;
var basic_1 = require("../basic");
exports.OBSERVED_DATA_TYPE = "observed-data";
exports.OBSERVED_SDO_FIELDS = [
    { key: "first_observed", viewValue: "First observed", type: 'observed-data', typeName: 'Observed SDO' },
    { key: "last_observed", viewValue: "Last observed", type: 'observed-data', typeName: 'Observed SDO' },
    { key: "created", viewValue: "Created", type: 'observed-data', typeName: 'Observed SDO' },
    { key: "modified", viewValue: "Modified", type: 'observed-data', typeName: 'Observed SDO' },
    // {key: "created_by_ref", value: "Created by ref", type: 'observed-data', typeName: 'Observed SDO'},
    { key: "x_ttps", viewValue: "TTPs", type: 'observed-data', typeName: 'Observed SDO' },
    { key: "x_artifact_type", viewValue: "Artifact type", type: 'observed-data', typeName: 'Observed SDO' },
];
function getObservedDataView(titleId, contentId, typeId, observedSDO) {
    document.getElementById(titleId).innerHTML += "Number observed: " + observedSDO.number_observed;
    document.getElementById(typeId).innerHTML += "Observed-Data";
    var el = document.getElementById(contentId);
    var observedDIV = document.createElement("div");
    observedDIV.id = "observed-data";
    if (observedSDO === null || observedSDO === void 0 ? void 0 : observedSDO.first_observed)
        basic_1.addNodeViewTitleAndText(observedDIV, "First observed:", new Date(observedSDO.first_observed).toString());
    if (observedSDO === null || observedSDO === void 0 ? void 0 : observedSDO.last_observed)
        basic_1.addNodeViewTitleAndText(observedDIV, "Last observed:", new Date(observedSDO.last_observed).toString());
    el.appendChild(observedDIV);
    basic_1.customFieldView(observedDIV.id, observedSDO);
    if (observedSDO === null || observedSDO === void 0 ? void 0 : observedSDO.external_references) {
        basic_1.externalReferencesView(observedDIV.id, observedSDO.external_references);
    }
}
exports.getObservedDataView = getObservedDataView;
