"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThreatActorView = exports.THREAT_ACTOR_SDO_FIELDS = exports.THREAT_ACTOR_TYPE = void 0;
var basic_1 = require("../basic");
exports.THREAT_ACTOR_TYPE = "threat-actor";
exports.THREAT_ACTOR_SDO_FIELDS = [
    { key: 'name', viewValue: 'Name' },
    { key: 'x_country', viewValue: 'Country' },
    { key: 'x_suspected_sponsor', viewValue: 'Suspected sponsor' },
    { key: 'first_seen', viewValue: 'First seen' },
    { key: 'goals', viewValue: 'Goals' },
    { key: 'aliases', viewValue: 'Aliases' },
    { key: 'x_target_category', viewValue: 'Sectors' },
    { key: 'x_suspected_victims', viewValue: 'Regions' },
    { key: 'description', viewValue: 'Description' }
];
function getThreatActorView(titleId, contentId, typeId, threatActorSDO) {
    document.getElementById(titleId).innerHTML += threatActorSDO.name;
    document.getElementById(typeId).innerHTML += "Threat Actor";
    var el = document.getElementById(contentId);
    var threatActorDIV = document.createElement("div");
    threatActorDIV.id = "threat-actor";
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.aliases)
        basic_1.addNodeViewTextList(threatActorDIV, threatActorSDO.aliases);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.description)
        basic_1.addNodeViewText(threatActorDIV, threatActorSDO.description);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.goals)
        basic_1.addNodeViewTitleAndTextList(threatActorDIV, "Goals:", threatActorSDO.goals, "badge-dark");
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.first_seen)
        basic_1.addNodeViewTitleAndText(threatActorDIV, "First seen:", new Date(threatActorSDO.first_seen).toString());
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.last_seen)
        basic_1.addNodeViewTitleAndText(threatActorDIV, "Last seen:", new Date(threatActorSDO.last_seen).toString());
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.threat_actor_types)
        basic_1.addNodeViewTitleAndTextList(threatActorDIV, "Threat Actor types:", threatActorSDO.threat_actor_types, "badge-dark");
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.roles)
        basic_1.addNodeViewTitleAndTextList(threatActorDIV, "Roles:", threatActorSDO.roles, "badge-dark");
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.sophistication)
        basic_1.addNodeViewTitleAndText(threatActorDIV, "Sophistication:", threatActorSDO.sophistication);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.resource_level)
        basic_1.addNodeViewTitleAndText(threatActorDIV, "Resource level:", threatActorSDO.resource_level);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.primary_motivation)
        basic_1.addNodeViewTitleAndText(threatActorDIV, "Primary motivation:", threatActorSDO.primary_motivation);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.secondary_motivations)
        basic_1.addNodeViewTitleAndTextList(threatActorDIV, "Secondary motivations:", threatActorSDO.secondary_motivations, "badge-dark");
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.personal_motivations)
        basic_1.addNodeViewTitleAndTextList(threatActorDIV, "Personal motivations:", threatActorSDO.personal_motivations, "badge-dark");
    el.appendChild(threatActorDIV);
    basic_1.customFieldView(threatActorDIV.id, threatActorSDO);
    if (threatActorSDO === null || threatActorSDO === void 0 ? void 0 : threatActorSDO.external_references) {
        basic_1.externalReferencesView(threatActorDIV.id, threatActorSDO.external_references);
    }
}
exports.getThreatActorView = getThreatActorView;
