import {
  addKillChainPhases,
  addNodeViewText, addNodeViewTextList,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO, customFieldView, externalReferencesView,
  KillChainPhase
} from "../basic";

export const INFRASTRUCTURE_TYPE = "infrastructure";

export interface InfrastructureSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  infrastructure_types?: string [];
  aliases?: string [];
  kill_chain_phases?: KillChainPhase [];
  first_seen?: string;
  last_seen?: string;
}

export function getInfrastructureView(titleId: string, contentId: string, typeId: string,
                                      infrastructureSDO: InfrastructureSDO) {
  document.getElementById(titleId).innerHTML += infrastructureSDO.name;
  document.getElementById(typeId).innerHTML += "Infrastructure";

  let el = document.getElementById(contentId);
  const infrastructureDIV = document.createElement("div");
  infrastructureDIV.id = "infrastructure";

  if (infrastructureSDO?.aliases) addNodeViewTitleAndTextList(infrastructureDIV, "Aliases:",
    infrastructureSDO.aliases);
  if (infrastructureSDO?.description) addNodeViewTitleAndText(infrastructureDIV, "Description:" ,infrastructureSDO.description);
  if (infrastructureSDO?.infrastructure_types) addNodeViewTitleAndTextList(infrastructureDIV,
    "Infrastructure types:", infrastructureSDO.infrastructure_types, "badge-dark");
  if(infrastructureSDO?.first_seen) addNodeViewTitleAndText(infrastructureDIV, "First seen: ",
    new Date(infrastructureSDO.first_seen).toString());
  if(infrastructureSDO?.last_seen) addNodeViewTitleAndText(infrastructureDIV, "Last seen: ",
    new Date(infrastructureSDO.last_seen).toString());
  if (infrastructureSDO?.kill_chain_phases) addKillChainPhases(infrastructureDIV, infrastructureSDO.kill_chain_phases);

  el.appendChild(infrastructureDIV);
  customFieldView(infrastructureDIV.id, infrastructureSDO);
  if (infrastructureSDO?.external_references) {
    externalReferencesView(infrastructureDIV.id, infrastructureSDO.external_references);
  }
}
