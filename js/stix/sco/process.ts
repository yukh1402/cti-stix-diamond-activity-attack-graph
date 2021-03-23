import {addNodeViewTitleAndText, addNodeViewTitleAndTextList, BasicSTIX, customFieldView, STIXField} from '../basic';

export const PROCESS_SCO_FIELDS: STIXField [] = [];

export const PROCESS_TYPE = "process";

export interface WindowsProcess {
  integrity_level?: string;
}

export interface WindowsProcessExt {
  'windows-process-ext': WindowsProcess;
}

export interface ProcessSCO extends BasicSTIX {
  is_hidden?: boolean;
  pid?: number;
  created_time?: string;
  cwd?: string;
  command_line?: string;
  environment_variables?: {};
  opened_connection_refs?: string [];
  creator_user_ref?: string;
  image_ref?: string;
  extensions?: {}
  parent_ref?: string;
  child_refs?: string [];
}

export function getProcessView(titleId: string, contentId: string, typeId: string, processSCO: ProcessSCO) {
  document.getElementById(titleId).innerHTML += processSCO?.command_line ? processSCO.command_line: "";
  document.getElementById(typeId).innerHTML += "Process";

  let el = document.getElementById(contentId);
  const processDIV = document.createElement("div");
  processDIV.id = "process";

  if (processSCO?.created_time) addNodeViewTitleAndText(processDIV, "Create time",
    new Date(processSCO.created_time).toString());
  if (processSCO?.is_hidden) addNodeViewTitleAndText(processDIV, "Process is hidden:",
    processSCO.is_hidden === true ? "Yes": "No");

  if (processSCO?.pid) addNodeViewTitleAndText(processDIV, "PID:", processSCO.pid.toString());
  if (processSCO?.cwd) addNodeViewTitleAndText(processDIV, "Current working directory:", processSCO.cwd);
  if (processSCO?.command_line) addNodeViewTitleAndText(processDIV, "Command line:", processSCO.command_line);

  el.appendChild(processDIV);
  customFieldView(processDIV.id, processSCO);
}
