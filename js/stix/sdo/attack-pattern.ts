import {BasicSDOSRO, KillChainPhase} from '../basic';

export const ATTACK_PATTERN_TYPE = "attack-pattern";

export interface AttackPatternSDO extends BasicSDOSRO{
  name: string;
  description: string;
  aliases: string [];
  kill_chain_phases: KillChainPhase [];
}

export function getAttackPatternView(attackPatternSDO: AttackPatternSDO) {

}
