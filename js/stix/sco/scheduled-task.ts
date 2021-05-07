export interface ScheduledTaskSCO {
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
