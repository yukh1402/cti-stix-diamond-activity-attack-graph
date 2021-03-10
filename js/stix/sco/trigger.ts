import {BasicSTIX, STIXField} from '../basic';

export const TRIGGER_SCO_FIELDS: STIXField [] = [
  {key: 'start', viewValue: 'Start time', type: 'x-trigger', typeName: 'Trigger'},
  {key: 'enabled', viewValue: 'enabled', type: 'x-trigger', typeName: 'Trigger'},
  {key: 'name', viewValue: 'Name', type: 'x-trigger', typeName: 'Trigger'}
];

export interface TriggerSCO extends BasicSTIX {
  start: Date;
  enabled: boolean;
  name: string;
}
