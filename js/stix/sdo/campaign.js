import {
  addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  customFieldView,
  externalReferencesView
} from "../basic.js";

export const CAMPAIGN_TYPE = "campaign";

export function getCampaignView(titleId, contentId, typeId, campaignSDO) {
  document.getElementById(titleId).innerHTML += campaignSDO.name;
  document.getElementById(typeId).innerHTML += "Campaign";

  let el = document.getElementById(contentId);
  const campaignDIV = document.createElement("div");
  campaignDIV.id = "campaign";

  if (campaignSDO?.aliases) addNodeViewTitleAndTextList(campaignDIV, "Aliases:", campaignSDO.aliases);
  if (campaignSDO?.description) addNodeViewTitleAndText(campaignDIV, "Description:", campaignSDO.description);
  if (campaignSDO?.first_seen) addNodeViewTitleAndText(campaignDIV, "First seen:",
    new Date(campaignSDO.first_seen).toString());
  if (campaignSDO?.last_seen) addNodeViewTitleAndText(campaignDIV, "Last seen:",
    new Date(campaignSDO.last_seen).toString());
  if(campaignSDO?.objective) addNodeViewTitleAndText(campaignDIV, "Objective:", campaignSDO.objective);

  el.appendChild(campaignDIV);
  customFieldView("campaign", campaignSDO);

  if (campaignSDO?.external_references) {
    externalReferencesView("campaign", campaignSDO.external_references);
  }
}
