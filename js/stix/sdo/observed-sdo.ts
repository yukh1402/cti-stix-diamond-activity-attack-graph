import {BasicSDOSRO, STIXField, STIXObject} from '../basic';

export const OBSERVED_SDO_FIELDS: STIXField [] = [
  {key: "first_observed", viewValue: "First observed", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "last_observed", viewValue: "Last observed", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "created", viewValue: "Created", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "modified", viewValue: "Modified", type: 'observed-data', typeName: 'Observed SDO'},
  // {key: "created_by_ref", value: "Created by ref", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "x_ttps", viewValue: "TTPs", type: 'observed-data', typeName: 'Observed SDO'},
  {key: "x_artifact_type", viewValue: "Artifact type", type: 'observed-data', typeName: 'Observed SDO'},
];



export interface ObservedSDO extends BasicSDOSRO{
  first_observed: Date;
  last_observed: Date;
  number_observed: number;
  object_refs: string [];
  x_ttps?: string [];
  x_artifact_type: string;
  x_unparsed_message: string;
}
