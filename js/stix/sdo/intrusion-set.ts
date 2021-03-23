import {
  addNodeViewText, addNodeViewTextList,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView, externalReferencesView
} from "../basic";

export const INTRUSION_SET_TYPE = "intrusion-set";

export interface IntrusionSetSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  aliases?: string [];
  first_seen?: string;
  last_seen?: string;
  goals?: string [];
  resource_level?: string;
  primary_motivation?: string;
  secondary_motivations?: string [];
}

export function getIntrusionSetView(titleId: string, contentId: string, typeId: string, intrusionSDO: IntrusionSetSDO) {
  document.getElementById(titleId).innerHTML += intrusionSDO.name;
  document.getElementById(typeId).innerHTML += "Intrusion Set";

  let el = document.getElementById(contentId);
  const intrusionDIV = document.createElement("div");
  intrusionDIV.id = "intrusion-set";

  if (intrusionSDO?.aliases) addNodeViewTextList(intrusionDIV, intrusionSDO.aliases);
  if (intrusionSDO?.description) addNodeViewText(intrusionDIV, intrusionSDO.description);

  if (intrusionSDO?.first_seen) addNodeViewTitleAndText(intrusionDIV, "First seen:",
    new Date(intrusionSDO.first_seen).toString());
  if (intrusionSDO?.last_seen) addNodeViewTitleAndText(intrusionDIV, "Last seen:",
    new Date(intrusionSDO.last_seen).toString());
  if (intrusionSDO?.goals) addNodeViewTitleAndTextList(intrusionDIV, "Goals:", intrusionSDO.goals,
    "badge-dark");
  if (intrusionSDO?.resource_level) addNodeViewTitleAndText(intrusionDIV, "Resource level:",
    intrusionSDO.resource_level);
  if (intrusionSDO?.primary_motivation) addNodeViewTitleAndText(intrusionDIV, "Primary motivation:",
    intrusionSDO.primary_motivation);
  if (intrusionSDO?.secondary_motivations) addNodeViewTitleAndTextList(intrusionDIV, "Secondary motivations:",
    intrusionSDO.secondary_motivations, "badge-dark");


  el.appendChild(intrusionDIV);
  customFieldView(intrusionDIV.id, intrusionSDO);
  if (intrusionSDO?.external_references) {
    externalReferencesView(intrusionDIV.id, intrusionSDO.external_references);
  }

}
