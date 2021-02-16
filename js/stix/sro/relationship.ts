import {STIXObject} from '../basic';

export enum RELATIONSHIP_TYPE {
  USES = 'uses',
  CONSISTS_OF = 'consists-of',
  CONTROLS = 'controls',
  DELIVERS = 'delivers',
  DERIVED_FROM = 'derived-from',
  MITIGATES = 'mitigates',
  INDICATES = 'indicates'
}


export interface RelationshipSRO {
  relationship_type: string;
  description?: string;
  source_ref: string;
  target_ref: string;
  start_time?: Date;
  stop_time?: Date;
}
