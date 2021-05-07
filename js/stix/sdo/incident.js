import {
  addNodeViewTitleAndText,
  customFieldView, externalReferencesView
} from "../basic.js";

export const INCIDENT_TYPE = "incident";

export function getIncidentView(titleId, contentId, typeId, incidentSDO) {
  document.getElementById(titleId).innerHTML += incidentSDO.name;
  document.getElementById(typeId).innerHTML += "Incident";

  let el = document.getElementById(contentId);
  const incidentDIV = document.createElement("div");
  incidentDIV.id = "incident";

  if (incidentSDO?.description) addNodeViewTitleAndText(incidentDIV, "Description:", incidentSDO.description);

  el.appendChild(incidentDIV);
  customFieldView(incidentDIV.id, incidentSDO);
  if (incidentSDO?.external_references) {
    externalReferencesView(incidentDIV.id, incidentSDO.external_references);
  }
}
