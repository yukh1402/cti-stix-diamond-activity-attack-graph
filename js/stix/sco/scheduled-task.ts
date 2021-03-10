import {BasicSTIX, STIXField} from '../basic';

export const SCHEDULED_TASK_SCO_FIELDS: STIXField [] = [
  {key: 'run_only_if_network_available', viewValue: 'Run only if network', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'multiple_instances', viewValue: 'Multiple instances', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'priority', viewValue: 'Priority', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'wake_to_run', viewValue: 'Wake to run', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'name', viewValue: 'Name', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'start_when_available', viewValue: 'Start when available', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'allow_hard_terminate', viewValue: 'Allow hard terminate', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'hidden', viewValue: 'Hidden', type: 'x-scheduled-task', typeName: 'Scheduled task'},
  {key: 'enabled', viewValue: 'Enabled', type: 'x-scheduled-task', typeName: 'Scheduled task'}
];

export interface ScheduledTaskSCO extends BasicSTIX{
  run_only_if_network_available: boolean;
  multiple_instances: string;
  priority: string;
  wake_to_run: boolean;
  name: string;
  process_refs: string [];
  start_when_available: boolean;
  allow_hard_terminate: boolean;
  hidden: boolean;
  enabled: boolean;
  creator_user_ref: string;
}
