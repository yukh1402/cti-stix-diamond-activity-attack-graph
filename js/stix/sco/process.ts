import {BasicSTIX, STIXField} from '../basic';

export const PROCESS_SCO_FIELDS: STIXField [] = [];

export interface WindowsProcess {
  integrity_level?: string;
}

export interface WindowsProcessExt {
  'windows-process-ext': WindowsProcess;
}

export interface ProcessSCO extends BasicSTIX {
  image_ref?: string;
  creator_user_ref?: string;
  extensions: WindowsProcessExt;
  command_line?: string;
  created_time?: Date;
  parent_ref?: string;
  x_guid?: string;
  pid?: number;
  cwd?: string;

}
