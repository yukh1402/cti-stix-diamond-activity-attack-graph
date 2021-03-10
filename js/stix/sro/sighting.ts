import {STIXObject} from '../basic';

export interface SightingSRO {
  description?: string;
  first_seen?: Date;
  last_seen?: Date;
  count?: number;
  sighting_of_ref?: string;
  observed_data_refs?: string [];
  where_sighted_refs?: string [];
  summary?: boolean;
}

export interface Sighting extends STIXObject{
  sighting_sro?: SightingSRO;
  grouping_id?: string;
}
