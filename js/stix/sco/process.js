"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessView = exports.PROCESS_TYPE = exports.PROCESS_SCO_FIELDS = void 0;
var basic_1 = require("../basic");
exports.PROCESS_SCO_FIELDS = [];
exports.PROCESS_TYPE = "process";
function getProcessView(titleId, contentId, typeId, processSCO) {
    document.getElementById(titleId).innerHTML += (processSCO === null || processSCO === void 0 ? void 0 : processSCO.command_line) ? processSCO.command_line : "";
    document.getElementById(typeId).innerHTML += "Process";
    var el = document.getElementById(contentId);
    var processDIV = document.createElement("div");
    processDIV.id = "process";
    if (processSCO === null || processSCO === void 0 ? void 0 : processSCO.created_time)
        basic_1.addNodeViewTitleAndText(processDIV, "Create time", new Date(processSCO.created_time).toString());
    if (processSCO === null || processSCO === void 0 ? void 0 : processSCO.is_hidden)
        basic_1.addNodeViewTitleAndText(processDIV, "Process is hidden:", processSCO.is_hidden === true ? "Yes" : "No");
    if (processSCO === null || processSCO === void 0 ? void 0 : processSCO.pid)
        basic_1.addNodeViewTitleAndText(processDIV, "PID:", processSCO.pid.toString());
    if (processSCO === null || processSCO === void 0 ? void 0 : processSCO.cwd)
        basic_1.addNodeViewTitleAndText(processDIV, "Current working directory:", processSCO.cwd);
    if (processSCO === null || processSCO === void 0 ? void 0 : processSCO.command_line)
        basic_1.addNodeViewTitleAndText(processDIV, "Command line:", processSCO.command_line);
    el.appendChild(processDIV);
    basic_1.customFieldView(processDIV.id, processSCO);
}
exports.getProcessView = getProcessView;
