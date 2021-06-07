import {
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  customFieldView, externalReferencesView
} from "../basic.js";

export const INTRUSION_SET_TYPE = "intrusion-set";

export function getIntrusionSetView(titleId, contentId, typeId, intrusionSDO) {
  document.getElementById(titleId).innerHTML += intrusionSDO.name;
  document.getElementById(typeId).innerHTML += "Intrusion Set";

  let el = document.getElementById(contentId);
  const intrusionDIV = document.createElement("div");
  intrusionDIV.id = "intrusion-set";

  if (intrusionSDO?.aliases) addNodeViewTitleAndTextList(intrusionDIV, "Aliases:", intrusionSDO.aliases);
  if (intrusionSDO?.description) addNodeViewTitleAndText(intrusionDIV, "Description:", intrusionSDO.description);

  if (intrusionSDO?.first_seen) addNodeViewTitleAndText(intrusionDIV, "First seen:",
    new Date(intrusionSDO.first_seen).toUTCString());
  if (intrusionSDO?.last_seen) addNodeViewTitleAndText(intrusionDIV, "Last seen:",
    new Date(intrusionSDO.last_seen).toUTCString());
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
