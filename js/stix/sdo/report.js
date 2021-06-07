import {
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  customFieldView, externalReferencesView
} from "../basic.js";

export const REPORT_TYPE = "report";

export function getReportView(titleId, contentId, typeId, reportSDO) {
  document.getElementById(titleId).innerHTML += reportSDO.name;
  document.getElementById(typeId).innerHTML += "Report";

  let el = document.getElementById(contentId);
  const reportDIV = document.createElement("div");
  reportDIV.id = "report";

  if (reportSDO?.description) addNodeViewTitleAndText(reportDIV, "Description:", reportSDO.description);
  if (reportSDO?.report_types) addNodeViewTitleAndTextList(reportDIV, "Report types:", reportSDO.report_types,
    "badge-dark");
  if (reportSDO?.published) addNodeViewTitleAndText(reportDIV, "Published:",
    new Date(reportSDO.published).toUTCString());

  el.appendChild(reportDIV);
  customFieldView(reportDIV.id, reportSDO);
  if (reportSDO?.external_references) {
    externalReferencesView(reportDIV.id, reportSDO.external_references);
  }
}
