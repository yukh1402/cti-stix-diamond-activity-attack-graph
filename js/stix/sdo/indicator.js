import {
  addKillChainPhases,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  customFieldView, externalReferencesView
} from "../basic";

export const INDICATOR_TYPE = "indicator";

export function getIndicatorView(titleId, contentId, typeId, indicatorSDO) {
  document.getElementById(titleId).innerHTML += indicatorSDO.name;
  document.getElementById(typeId).innerHTML += "Indicator";

  let el = document.getElementById(contentId);
  const indicatorDIV = document.createElement("div");
  indicatorDIV.id = "indicator";

  if (indicatorSDO?.description) addNodeViewTitleAndText(indicatorDIV, "Description:", indicatorSDO.description);
  if (indicatorSDO?.indicator_types) addNodeViewTitleAndTextList(indicatorDIV, "Indicator types:" ,
    indicatorSDO.indicator_types, "badge-dark");
  if (indicatorSDO?.pattern) addNodeViewTitleAndText(indicatorDIV, "Pattern:", indicatorSDO.pattern);
  if (indicatorSDO?.pattern_type) addNodeViewTitleAndText(indicatorDIV, "Type:", indicatorSDO.pattern_type);
  if (indicatorSDO?.pattern_version) addNodeViewTitleAndText(indicatorDIV, "Version:", indicatorSDO.pattern_version);
  if (indicatorSDO?.valid_from) addNodeViewTitleAndText(indicatorDIV, "Valid from:",
    new Date(indicatorSDO.valid_from).toString());
  if (indicatorSDO?.valid_until) addNodeViewTitleAndText(indicatorDIV, "Valid unti:",
    new Date(indicatorSDO.valid_until).toString());
  if(indicatorSDO?.kill_chain_phases) addKillChainPhases(indicatorDIV, indicatorSDO.kill_chain_phases);

  el.appendChild(indicatorDIV);
  customFieldView(indicatorDIV.id, indicatorSDO);
  if (indicatorSDO?.external_references) {
    externalReferencesView(indicatorDIV.id, indicatorSDO.external_references);
  }
}
