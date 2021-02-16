import {BasicSDOSRO, KillChainPhase, STIXObject} from '../basic';

export interface ToolSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  tool_types?: string;
  kill_chain_phases?: KillChainPhase [];
  aliases?: string [];
  tool_version?: string;
}

export interface Tool extends STIXObject{
  tool_sdo?: ToolSDO;
  grouping_id?: string;
}
