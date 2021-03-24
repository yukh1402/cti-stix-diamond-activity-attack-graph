"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncidentView = exports.INCIDENT_TYPE = void 0;
var basic_1 = require("../basic");
exports.INCIDENT_TYPE = "incident";
function getIncidentView(titleId, contentId, typeId, incidentSDO) {
    document.getElementById(titleId).innerHTML += incidentSDO.name;
    document.getElementById(typeId).innerHTML += "Incident";
    var el = document.getElementById(contentId);
    var incidentDIV = document.createElement("div");
    incidentDIV.id = "incident";
    if (incidentSDO === null || incidentSDO === void 0 ? void 0 : incidentSDO.description)
        basic_1.addNodeViewTitleAndText(incidentDIV, "Description:", incidentSDO.description);
    el.appendChild(incidentDIV);
    basic_1.customFieldView(incidentDIV.id, incidentSDO);
    if (incidentSDO === null || incidentSDO === void 0 ? void 0 : incidentSDO.external_references) {
        basic_1.externalReferencesView(incidentDIV.id, incidentSDO.external_references);
    }
}
exports.getIncidentView = getIncidentView;
