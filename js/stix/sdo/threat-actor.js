import {
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  customFieldView, externalReferencesView,
} from '../basic';

export const THREAT_ACTOR_TYPE = "threat-actor"


export function getThreatActorView(titleId, contentId, typeId, threatActorSDO) {
  document.getElementById(titleId).innerHTML += threatActorSDO.name;
  document.getElementById(typeId).innerHTML += "Threat Actor";

  let el = document.getElementById(contentId);
  const threatActorDIV = document.createElement("div");
  threatActorDIV.id = "threat-actor";

  if(threatActorSDO?.aliases) addNodeViewTitleAndTextList(threatActorDIV, "Aliases:", threatActorSDO.aliases);
  if (threatActorSDO?.description) addNodeViewTitleAndText(threatActorDIV, "Description:", threatActorSDO.description);
  if (threatActorSDO?.goals) addNodeViewTitleAndTextList(threatActorDIV, "Goals:", threatActorSDO.goals,
    "badge-dark");
  if (threatActorSDO?.first_seen) addNodeViewTitleAndText(threatActorDIV, "First seen:",
    new Date(threatActorSDO.first_seen).toString());
  if (threatActorSDO?.last_seen) addNodeViewTitleAndText(threatActorDIV, "Last seen:",
    new Date(threatActorSDO.last_seen).toString());
  if (threatActorSDO?.threat_actor_types) addNodeViewTitleAndTextList(threatActorDIV, "Threat Actor types:",
    threatActorSDO.threat_actor_types, "badge-dark");
  if (threatActorSDO?.roles) addNodeViewTitleAndTextList(threatActorDIV, "Roles:",
    threatActorSDO.roles, "badge-dark");
  if (threatActorSDO?.sophistication) addNodeViewTitleAndText(threatActorDIV, "Sophistication:",
    threatActorSDO.sophistication);
  if (threatActorSDO?.resource_level) addNodeViewTitleAndText(threatActorDIV, "Resource level:",
    threatActorSDO.resource_level);
  if (threatActorSDO?.primary_motivation) addNodeViewTitleAndText(threatActorDIV, "Primary motivation:",
    threatActorSDO.primary_motivation);
  if (threatActorSDO?.secondary_motivations) addNodeViewTitleAndTextList(threatActorDIV, "Secondary motivations:",
    threatActorSDO.secondary_motivations, "badge-dark");
  if (threatActorSDO?.personal_motivations) addNodeViewTitleAndTextList(threatActorDIV, "Personal motivations:",
    threatActorSDO.personal_motivations, "badge-dark");

  el.appendChild(threatActorDIV);
  customFieldView(threatActorDIV.id, threatActorSDO);
  if (threatActorSDO?.external_references) {
    externalReferencesView(threatActorDIV.id, threatActorSDO.external_references);
  }
}
