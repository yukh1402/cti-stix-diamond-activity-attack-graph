"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomSTIXView = exports.addKillChainPhases = exports.addNodeViewTextList = exports.addNodeViewText = exports.addNodeViewTitle = exports.addNodeViewTitleAndTextList = exports.addNodeViewTitleAndText = exports.externalReferencesView = exports.customFieldView = exports.STIX_FIELDS = void 0;
var observed_sdo_1 = require("./sdo/observed-sdo");
var identity_1 = require("./sdo/identity");
var software_1 = require("./sco/software");
var directory_1 = require("./sco/directory");
var file_1 = require("./sco/file");
var user_account_1 = require("./sco/user-account");
var network_traffic_1 = require("./sco/network-traffic");
var scheduled_task_1 = require("./sco/scheduled-task");
var utils_1 = require("../../js/graph/utils");
exports.STIX_FIELDS = __spreadArrays(observed_sdo_1.OBSERVED_SDO_FIELDS, identity_1.IDENTITY_SDO_FIELDS, software_1.SOFTWARE_SCO_FIELDS, directory_1.DIRECTORY_SCO_FIELDS, file_1.FILE_SCO_FIELDS, user_account_1.USER_ACCOUNT_SCO_FIELDS, network_traffic_1.NETWORK_TRAFFIC_SCO_FIELDS, scheduled_task_1.SCHEDULED_TASK_SCO_FIELDS);
/**
 * All custom keys defined in a SDO/SCO that start with x_ are displayed in a specific pattern
 * @param divId: The DIV id where the custom field values should be displayed
 * @param obj: Any SDO or SCO
 * @param allKeys: Display all fields and not only custom fields
 */
function customFieldView(divId, obj, allKeys) {
    if (allKeys === void 0) { allKeys = false; }
    var customKeys = [];
    if (allKeys === false) {
        customKeys = Object.keys(obj).filter(function (key) { return key.charAt(0) == "x" && key.charAt(1) == "_"; });
    }
    else {
        customKeys = Object.keys(obj).filter(function (key) { return key !== "id" && key !== "type" && key !== "spec_version"; });
    }
    if (customKeys.length > 0) {
        var customDIV_1 = document.createElement("div");
        customKeys.forEach(function (key) {
            addNodeViewTitle(customDIV_1, reformatCustomKey(key) + ":");
            if (Array.isArray(obj[key])) {
                //  Show as badges
                addNodeViewTextList(customDIV_1, obj[key], "badge-dark");
            }
            else {
                addNodeViewText(customDIV_1, obj[key]);
            }
        });
        document.getElementById(divId).appendChild(customDIV_1);
    }
}
exports.customFieldView = customFieldView;
/**
 * A custom key needs to be reformatted in a proper way. E.g x_phase_any -> Phase any
 * @param customKey: Any x_ key
 */
function reformatCustomKey(customKey) {
    return utils_1.capitalize(customKey.replace("x_", "")).split("_").join(" ");
}
/**
 * Create External References View for SDOs
 * @param divId: Where the HTML should be applied
 * @param externalReferences: The External References given in a SDO
 */
function externalReferencesView(divId, externalReferences) {
    var referenceDIV = document.createElement("div");
    referenceDIV.className = "mt-3";
    referenceDIV.innerHTML += "<span><b>External References:</b></span><div id='accordion' class='mt-2'>";
    var index = 0;
    externalReferences.forEach(function (ref) {
        referenceDIV.innerHTML += "<div class='card'><div class='card-header' id='heading" + index + "'>" +
            "      <h5 class='mb-0'>" +
            "        <button class='btn btn-link'>" +
            "         <a target='_blank' href='" + (ref === null || ref === void 0 ? void 0 : ref.url) + "'>" +
            utils_1.capitalize(ref.source_name) + getExternalId(ref === null || ref === void 0 ? void 0 : ref.external_id) +
            "        </a></button>" +
            "      </h5>" +
            "    </div>" +
            "</div>";
        index++;
    });
    document.getElementById(divId).appendChild(referenceDIV);
}
exports.externalReferencesView = externalReferencesView;
function addNodeViewTitleAndText(divEl, title, text) {
    addNodeViewTitle(divEl, title);
    addNodeViewText(divEl, text);
}
exports.addNodeViewTitleAndText = addNodeViewTitleAndText;
function addNodeViewTitleAndTextList(divEl, title, textList, badgeColor) {
    if (badgeColor === void 0) { badgeColor = "badge-primary"; }
    addNodeViewTitle(divEl, title);
    addNodeViewTextList(divEl, textList, badgeColor);
}
exports.addNodeViewTitleAndTextList = addNodeViewTitleAndTextList;
function addNodeViewTitle(divEl, title) {
    divEl.innerHTML += "<div class='mt-3'><b>" + title + "</b></div>";
}
exports.addNodeViewTitle = addNodeViewTitle;
/**
 * Add text to a DIV element in the node view
 * @param divEl: DIV Element
 * @param text: Text that should be displayed inside the DIV
 */
function addNodeViewText(divEl, text) {
    divEl.innerHTML +=
        "<div class='view-border-bottom'>" + text + "</div>";
}
exports.addNodeViewText = addNodeViewText;
function addNodeViewTextList(divEl, textList, badgeColor) {
    if (badgeColor === void 0) { badgeColor = "badge-primary"; }
    var badgeDIV = document.createElement("div");
    badgeDIV.className = "view-border-bottom";
    textList.forEach(function (alias) {
        badgeDIV.innerHTML += "<span class='badge badge-pill m-1 " + badgeColor + "'>" + alias + "</span>";
    });
    divEl.appendChild(badgeDIV);
}
exports.addNodeViewTextList = addNodeViewTextList;
function addKillChainPhases(divEl, killChainPhases) {
    addNodeViewTitle(divEl, "Kill Chain Phases:");
    var killChainDIV = document.createElement("div");
    killChainDIV.className = "view-border-bottom";
    killChainPhases.forEach(function (phase) {
        if ((phase === null || phase === void 0 ? void 0 : phase.phase_name) && (phase === null || phase === void 0 ? void 0 : phase.kill_chain_name)) {
            killChainDIV.innerHTML += "<li class='list-group-item'>" + utils_1.capitalize(phase.kill_chain_name) +
                "<span class='badge badge-dark ml-1'>" + utils_1.capitalize(phase.phase_name) + "</span>"
                + "</li>";
        }
    });
    divEl.appendChild(killChainDIV);
}
exports.addKillChainPhases = addKillChainPhases;
function getCustomSTIXView(contentId, typeId, data) {
    document.getElementById(typeId).innerHTML += utils_1.capitalize(data.type);
    var el = document.getElementById(contentId);
    var dataDIV = document.createElement("div");
    dataDIV.id = data.type;
    el.appendChild(dataDIV);
    customFieldView(dataDIV.id, data, true);
}
exports.getCustomSTIXView = getCustomSTIXView;
/**
 * Get External ID if exists else return empty string
 */
function getExternalId(externalId) {
    if (externalId !== undefined) {
        return " - " + externalId;
    }
    else {
        return "";
    }
}
