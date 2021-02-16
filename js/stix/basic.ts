import {OBSERVED_SDO_FIELDS} from './sdo/observed-sdo';
import {IDENTITY_SDO_FIELDS} from './sdo/identity';
import {SOFTWARE_SCO_FIELDS} from './sco/software';
import {DIRECTORY_SCO_FIELDS} from './sco/directory';
import {FILE_SCO_FIELDS} from './sco/file';
import {USER_ACCOUNT_SCO_FIELDS} from './sco/user-account';
import {NETWORK_TRAFFIC_SCO_FIELDS} from './sco/network-traffic';
import {IPV4_SCO_FIELDS, IPV6_SCO_FIELDS} from './sco/ipv-sco';
import {SCHEDULED_TASK_SCO_FIELDS} from './sco/scheduled-task';

export enum STIX_SDO_TYPES {
  ATTACK_PATTERN = 'Attack Pattern',
  GROUPING = 'Grouping',
  IDENTITY = 'Identity',
  MALWARE = 'Malware',
  TOOL = 'Tool',
  THREAT_ACTOR = 'Threat Actor',
  VULNERABILITY = 'Vulnerability',
  OBSERVED_DATA = 'Observed Data'
}

export interface Reference {
  source_name: string;
  url: string;
  external_id?: string;
}

export interface KillChainPhase {
  kill_chain_name: string;
  phase_name: string;
}

export interface BasicSTIX {
  id: string;
  type: string;
  spec_version: string;
  x_immutable: boolean;
}

export interface BasicSDOSRO extends BasicSTIX {
  created_by_ref?: string;
  created: Date;
  modified: Date;
  revoked?: boolean;
  labels?: string [];
  confidence?: number;
  lang?: string;
  external_references?: Reference [];
  object_marking_refs?: string [];
  granular_markings?: string [];
}

export interface STIXField {
  key: string;
  viewValue: string;
  type: string;
  typeName: string;
}

export interface STIXObject {
  unique_id?: string;
  custom?: boolean;
  id?: string;
}

export const STIX_FIELDS = [...OBSERVED_SDO_FIELDS, ...IDENTITY_SDO_FIELDS, ...SOFTWARE_SCO_FIELDS, ...DIRECTORY_SCO_FIELDS,
  ...FILE_SCO_FIELDS, ...USER_ACCOUNT_SCO_FIELDS, ...NETWORK_TRAFFIC_SCO_FIELDS, ...IPV4_SCO_FIELDS, ...IPV6_SCO_FIELDS,
  ...SCHEDULED_TASK_SCO_FIELDS];
