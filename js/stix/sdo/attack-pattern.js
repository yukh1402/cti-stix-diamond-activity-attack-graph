import {
  addKillChainPhases,
  addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  customFieldView,
  externalReferencesView
} from '../basic.js';

export const ATTACK_PATTERN_TYPE = "attack-pattern";

export function getAttackPatternView(titleId, contentId, typeId, attackPatternSDO) {
  document.getElementById(titleId).innerHTML += attackPatternSDO.name;
  document.getElementById(typeId).innerHTML += "Attack-Pattern";

  let el = document.getElementById(contentId);
  const attackPatternDIV = document.createElement("div");
  attackPatternDIV.id = "attack-pattern";

  if (attackPatternSDO?.aliases) addNodeViewTitleAndTextList(attackPatternDIV, "Aliases:",
    attackPatternSDO.aliases);
  if (attackPatternSDO?.description) addNodeViewTitleAndText(attackPatternDIV, "Description:",
    attackPatternSDO.description);

  if (attackPatternSDO?.kill_chain_phases) addKillChainPhases(attackPatternDIV, attackPatternSDO.kill_chain_phases);

  el.appendChild(attackPatternDIV);

  customFieldView("attack-pattern", attackPatternSDO);

  if (attackPatternSDO?.external_references) {
    externalReferencesView("attack-pattern", attackPatternSDO.external_references);
  }
}
