import {BasicSDOSRO, KillChainPhase} from '../basic';

export interface AttackPatternSDO extends BasicSDOSRO{
  name: string;
  description: string;
  aliases: string [];
  kill_chain_phases: KillChainPhase [];
}
