import {
  addNodeViewText,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView, externalReferencesView
} from "../basic";

export const REPORT_TYPE = "report";

export interface ReportSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  report_types?: string [];
  published: string; // timestamp
  object_refs: string [];
}

export function getReportView(titleId: string, contentId: string, typeId: string, reportSDO: ReportSDO) {
  document.getElementById(titleId).innerHTML += reportSDO.name;
  document.getElementById(typeId).innerHTML += "Report";

  let el = document.getElementById(contentId);
  const reportDIV = document.createElement("div");
  reportDIV.id = "report";

  if (reportSDO?.description) addNodeViewTitleAndText(reportDIV, "Description:", reportSDO.description);
  if (reportSDO?.report_types) addNodeViewTitleAndTextList(reportDIV, "Report types:", reportSDO.report_types,
    "badge-dark");
  if (reportSDO?.published) addNodeViewTitleAndText(reportDIV, "Published:",
    new Date(reportSDO.published).toString());

  el.appendChild(reportDIV);
  customFieldView(reportDIV.id, reportSDO);
  if (reportSDO?.external_references) {
    externalReferencesView(reportDIV.id, reportSDO.external_references);
  }
}
