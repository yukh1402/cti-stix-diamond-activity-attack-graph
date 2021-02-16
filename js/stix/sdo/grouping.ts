import {BasicSDOSRO} from '../basic';

export enum DIAMOND_EVENT_CATEGORY {
  ADVERSARY = 'adversary',
  CAPABILITIES = 'capabilities',
  INFRASTRUCTURE = 'infrastructure',
  VICTIM = 'victim'
}

// A Grouping object reflects a Diamond Model Event
export interface GroupingSDO extends BasicSDOSRO{
  name?: string;
  description?: string;
  context: string;
  object_refs?: string [];
  x_master_event: boolean;
}
