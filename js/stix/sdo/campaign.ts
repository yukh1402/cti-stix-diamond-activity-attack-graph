import {
  addNodeViewText,
  addNodeViewTextList,
  addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView,
  externalReferencesView
} from "../basic";

export const CAMPAIGN_TYPE = "campaign";

export interface CampaignSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  aliases?: string [];
  first_seen?: string;
  last_seen?: string;
  objective?: string;
}

export function getCampaignView(titleId: string, contentId: string, typeId: string, campaignSDO: CampaignSDO) {
  document.getElementById(titleId).innerHTML += campaignSDO.name;
  document.getElementById(typeId).innerHTML += "Campaign";

  let el = document.getElementById(contentId);
  const campaignDIV = document.createElement("div");
  campaignDIV.id = "campaign";

  if (campaignSDO?.aliases) addNodeViewTitleAndTextList(campaignDIV, "Aliases:", campaignSDO.aliases);
  if (campaignSDO?.description) addNodeViewTitleAndText(campaignDIV, "Description:", campaignSDO.description);
  if (campaignSDO?.first_seen) {
    campaignDIV.innerHTML += "<span class='mt-2'><b>First seen:</b></span>"
    addNodeViewText(campaignDIV, new Date(campaignSDO.first_seen).toString())
  }
  if (campaignSDO?.last_seen) {
    campaignDIV.innerHTML += "<span class='mt-2'><b>Last seen:</b></span>"
    addNodeViewText(campaignDIV, new Date(campaignSDO.last_seen).toString())
  }
  if(campaignSDO?.objective) {
    campaignDIV.innerHTML += "<span class='mt-2'><b>Objective:</b></span>";
    addNodeViewText(campaignDIV, campaignSDO.objective);
  }

  el.appendChild(campaignDIV);
  customFieldView("campaign", campaignSDO);

  if (campaignSDO?.external_references) {
    externalReferencesView("campaign", campaignSDO.external_references);
  }
}
