"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCampaignView = exports.CAMPAIGN_TYPE = void 0;
var basic_1 = require("../basic");
exports.CAMPAIGN_TYPE = "campaign";
function getCampaignView(titleId, contentId, typeId, campaignSDO) {
    document.getElementById(titleId).innerHTML += campaignSDO.name;
    document.getElementById(typeId).innerHTML += "Campaign";
    var el = document.getElementById(contentId);
    var campaignDIV = document.createElement("div");
    campaignDIV.id = "campaign";
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.aliases)
        basic_1.addNodeViewTitleAndTextList(campaignDIV, "Aliases:", campaignSDO.aliases);
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.description)
        basic_1.addNodeViewTitleAndText(campaignDIV, "Description:", campaignSDO.description);
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.first_seen)
        basic_1.addNodeViewTitleAndText(campaignDIV, "First seen:", new Date(campaignSDO.first_seen).toString());
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.last_seen)
        basic_1.addNodeViewTitleAndText(campaignDIV, "Last seen:", new Date(campaignSDO.last_seen).toString());
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.objective)
        basic_1.addNodeViewTitleAndText(campaignDIV, "Objective:", campaignSDO.objective);
    el.appendChild(campaignDIV);
    basic_1.customFieldView("campaign", campaignSDO);
    if (campaignSDO === null || campaignSDO === void 0 ? void 0 : campaignSDO.external_references) {
        basic_1.externalReferencesView("campaign", campaignSDO.external_references);
    }
}
exports.getCampaignView = getCampaignView;
