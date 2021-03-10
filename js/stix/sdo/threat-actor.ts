import {BasicSDOSRO, BasicSTIX, STIXObject} from '../basic';

export const THREAT_ACTOR_TYPE = "threat-actor"

export const THREAT_ACTOR_SDO_FIELDS = [
  {key: 'name', viewValue: 'Name'},
  {key: 'x_country', viewValue: 'Country'},
  {key: 'x_suspected_sponsor', viewValue: 'Suspected sponsor'},
  {key: 'first_seen', viewValue: 'First seen'},
  {key: 'goals', viewValue: 'Goals'},
  {key: 'aliases', viewValue: 'Aliases'},
  {key: 'x_target_category', viewValue: 'Sectors'},
  {key: 'x_suspected_victims', viewValue: 'Regions'},
  {key: 'description', viewValue: 'Description'}
];

export interface ThreatActorSDO extends BasicSDOSRO {
  aliases?: string [];
  x_confidence_score?: string;
  x_cti_source: string;
  x_target_category?: string [];
  description: string;
  x_country?: string;
  name: string;
  goals?: string [];
  x_unparsed_message: string;
  x_suspected_victims: string [];
  first_seen?: Date;
  last_seen?: Date;
  x_suspected_sponsor?: string;
  threat_actor_types?: string [];
  roles?: string [];
  sophistication?: string;
  resource_level?: string;
  primary_motivation?: string;
  secondary_motivations?: string [];
  personal_motivations?: string [];
}

export interface ThreatActor extends STIXObject{
  threat_actor_sdo?: ThreatActorSDO;
  grouping_id?: string;
}
