import {
  addNodeViewTitleAndText,
  customFieldView, externalReferencesView,
} from '../basic';

export const OBSERVED_DATA_TYPE = "observed-data"

export function getObservedDataView(titleId, contentId, typeId, observedSDO) {
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
