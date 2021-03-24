import {
  addNodeViewTitleAndText,
  BasicSDOSRO,
  customFieldView, externalReferencesView,
  STIXField
} from '../basic';

export const OBSERVED_DATA_TYPE = "observed-data"

export const OBSERVED_SDO_FIELDS: STIXField [] = [
  {key: "first_observed", viewValue: "First observed", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "last_observed", viewValue: "Last observed", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "created", viewValue: "Created", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "modified", viewValue: "Modified", type: 'observed-data', typeName: 'Observed SDO'},
  // {key: "created_by_ref", value: "Created by ref", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "x_ttps", viewValue: "TTPs", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "x_artifact_type", viewValue: "Artifact type", type: 'observed-data', typeName: 'Observed SDO'},
];

export interface ObservedSDO extends BasicSDOSRO{
  first_observed: string; // Timestamp
  last_observed: string; // Timestamp
  number_observed: number;
  object_refs: string [];
}

export function getObservedDataView(titleId: string, contentId: string, typeId: string, observedSDO: ObservedSDO) {
  document.getElementById(titleId).innerHTML += "Number observed: " + observedSDO.number_observed;
  document.getElementById(typeId).innerHTML += "Observed-Data";

  let el = document.getElementById(contentId);
  const observedDIV = document.createElement("div");
  observedDIV.id = "observed-data";

  if (observedSDO?.first_observed) addNodeViewTitleAndText(observedDIV, "First observed:",
    new Date(observedSDO.first_observed).toString());
  if (observedSDO?.last_observed) addNodeViewTitleAndText(observedDIV, "Last observed:",
    new Date(observedSDO.last_observed).toString());

  el.appendChild(observedDIV);
  customFieldView(observedDIV.id, observedSDO);
  if (observedSDO?.external_references) {
    externalReferencesView(observedDIV.id, observedSDO.external_references);
  }

}
