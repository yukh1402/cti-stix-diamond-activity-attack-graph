import {addNodeViewTitleAndText, customFieldView} from "../basic.js";

export const PROCESS_TYPE = "process";


export function getProcessView(titleId, contentId, typeId, processSCO) {
  document.getElementById(titleId).innerHTML += processSCO?.command_line ? processSCO.command_line: processSCO?.x_name ? processSCO.x_name: "";
  document.getElementById(typeId).innerHTML += "Process";

  let el = document.getElementById(contentId);
  const processDIV = document.createElement("div");
  processDIV.id = "process";

  if (processSCO?.created_time) addNodeViewTitleAndText(processDIV, "Create time",
    new Date(processSCO.created_time).toUTCString());
  if (processSCO?.is_hidden) addNodeViewTitleAndText(processDIV, "Process is hidden:",
    processSCO.is_hidden === true ? "Yes": "No");

  if (processSCO?.pid) addNodeViewTitleAndText(processDIV, "PID:", processSCO.pid.toString());
  if (processSCO?.cwd) addNodeViewTitleAndText(processDIV, "Current working directory:", processSCO.cwd);
  if (processSCO?.command_line) addNodeViewTitleAndText(processDIV, "Command line:", processSCO.command_line);

  el.appendChild(processDIV);
  customFieldView(processDIV.id, processSCO, true, ["cwd", "command_line", "pid", "is_hidden"]);
}
