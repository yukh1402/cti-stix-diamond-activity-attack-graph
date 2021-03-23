"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportView = exports.REPORT_TYPE = void 0;
var basic_1 = require("../basic");
exports.REPORT_TYPE = "report";
function getReportView(titleId, contentId, typeId, reportSDO) {
    document.getElementById(titleId).innerHTML += reportSDO.name;
    document.getElementById(typeId).innerHTML += "Report";
    var el = document.getElementById(contentId);
    var reportDIV = document.createElement("div");
    reportDIV.id = "report";
    if (reportSDO === null || reportSDO === void 0 ? void 0 : reportSDO.description)
        basic_1.addNodeViewText(reportDIV, reportSDO.description);
    if (reportSDO === null || reportSDO === void 0 ? void 0 : reportSDO.report_types)
        basic_1.addNodeViewTitleAndTextList(reportDIV, "Report types:", reportSDO.report_types, "badge-dark");
    if (reportSDO === null || reportSDO === void 0 ? void 0 : reportSDO.published)
        basic_1.addNodeViewTitleAndText(reportDIV, "Published:", new Date(reportSDO.published).toString());
    el.appendChild(reportDIV);
    basic_1.customFieldView(reportDIV.id, reportSDO);
    if (reportSDO === null || reportSDO === void 0 ? void 0 : reportSDO.external_references) {
        basic_1.externalReferencesView(reportDIV.id, reportSDO.external_references);
    }
}
exports.getReportView = getReportView;
