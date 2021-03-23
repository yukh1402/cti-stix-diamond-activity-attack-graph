import {
  addNodeViewText,
  BasicSDOSRO,
  customFieldView, externalReferencesView
} from "../basic";

export const INCIDENT_TYPE = "incident";

export interface IncidentSDO extends BasicSDOSRO {
  name: string;
  description?: string;
}

export function getIncidentView(titleId: string, contentId: string, typeId: string, incidentSDO: IncidentSDO) {
  document.getElementById(titleId).innerHTML += incidentSDO.name;
  document.getElementById(typeId).innerHTML += "Incident";

  let el = document.getElementById(contentId);
  const incidentDIV = document.createElement("div");
  incidentDIV.id = "incident";

  if (incidentSDO?.description) addNodeViewText(incidentDIV, incidentSDO.description);

  el.appendChild(incidentDIV);
  customFieldView(incidentDIV.id, incidentSDO);
  if (incidentSDO?.external_references) {
    externalReferencesView(incidentDIV.id, incidentSDO.external_references);
  }
}
