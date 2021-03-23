"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolView = exports.TOOL_TYPE = void 0;
var basic_1 = require("../basic");
exports.TOOL_TYPE = "tool";
function getToolView(titleId, contentId, typeId, toolSDO) {
    document.getElementById(titleId).innerHTML += toolSDO.name;
    document.getElementById(typeId).innerHTML += "Tool";
    var el = document.getElementById(contentId);
    var toolDIV = document.createElement("div");
    toolDIV.id = "tool";
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.aliases)
        basic_1.addNodeViewTextList(toolDIV, toolSDO.aliases);
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.description)
        basic_1.addNodeViewText(toolDIV, toolSDO.description);
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.tool_types)
        basic_1.addNodeViewTitleAndTextList(toolDIV, "Tool types:", toolSDO.tool_types, "badge-dark");
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.tool_version)
        basic_1.addNodeViewTitleAndText(toolDIV, "Version:", toolSDO.tool_version);
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.kill_chain_phases)
        basic_1.addKillChainPhases(toolDIV, toolSDO.kill_chain_phases);
    el.appendChild(toolDIV);
    basic_1.customFieldView(toolDIV.id, toolSDO);
    if (toolSDO === null || toolSDO === void 0 ? void 0 : toolSDO.external_references) {
        basic_1.externalReferencesView(toolDIV.id, toolSDO.external_references);
    }
}
exports.getToolView = getToolView;
