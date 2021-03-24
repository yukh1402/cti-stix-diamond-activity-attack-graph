import {
  addKillChainPhases,
  addNodeViewText,
  addNodeViewTextList, addNodeViewTitle, addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView,
  externalReferencesView,
  KillChainPhase
} from '../basic';
import {capitalize} from '../../graph/utils';

export const ATTACK_PATTERN_TYPE = "attack-pattern";

export interface AttackPatternSDO extends BasicSDOSRO{
  name: string;
  description: string;
  aliases: string [];
  kill_chain_phases: KillChainPhase [];
}

export function getAttackPatternView(titleId: string, contentId: string, typeId: string, attackPatternSDO: AttackPatternSDO) {
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
