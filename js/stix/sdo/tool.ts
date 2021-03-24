import {
  addKillChainPhases,
  addNodeViewText, addNodeViewTextList,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO, customFieldView, externalReferencesView,
  KillChainPhase,
  STIXObject
} from '../basic';

export const TOOL_TYPE = "tool"


export interface ToolSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  tool_types?: string [];
  kill_chain_phases?: KillChainPhase [];
  aliases?: string [];
  tool_version?: string;
}

export function getToolView(titleId: string, contentId: string, typeId: string, toolSDO: ToolSDO) {
  document.getElementById(titleId).innerHTML += toolSDO.name;
  document.getElementById(typeId).innerHTML += "Tool";

  let el = document.getElementById(contentId);
  const toolDIV = document.createElement("div");
  toolDIV.id = "tool";

  if (toolSDO?.aliases) addNodeViewTitleAndTextList(toolDIV, "Aliases:", toolSDO.aliases);
  if (toolSDO?.description) addNodeViewTitleAndText(toolDIV, "Description:", toolSDO.description);
  if (toolSDO?.tool_types) addNodeViewTitleAndTextList(toolDIV, "Tool types:", toolSDO.tool_types,
    "badge-dark");
  if (toolSDO?.tool_version) addNodeViewTitleAndText(toolDIV, "Version:", toolSDO.tool_version)
  if (toolSDO?.kill_chain_phases) addKillChainPhases(toolDIV, toolSDO.kill_chain_phases);

  el.appendChild(toolDIV);
  customFieldView(toolDIV.id, toolSDO);
  if (toolSDO?.external_references) {
    externalReferencesView(toolDIV.id, toolSDO.external_references);
  }
}
