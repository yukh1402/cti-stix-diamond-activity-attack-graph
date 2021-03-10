import {STIXObject} from '../basic';

export const RELATIONSHIP_TYPE = "relationship";

export interface RelationshipSRO {
  relationship_type: string;
  description?: string;
  source_ref: string;
  target_ref: string;
  start_time?: Date;
  stop_time?: Date;
}
