import {
  addNodeViewText,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView, externalReferencesView
} from "../basic";

export const OPINION_TYPE = "opinion";

export interface OpinionSDO extends BasicSDOSRO {
  authors?: string [];
  explanation: string;
  opinion: string;
  object_refs: string [];
}

export function getOpinionView(titleId: string, contentId: string, typeId: string, opinionSDO: OpinionSDO) {
  document.getElementById(titleId).innerHTML += opinionSDO.opinion;
  document.getElementById(typeId).innerHTML += "Opinion";

  let el = document.getElementById(contentId);
  const opinionDIV = document.createElement("div");
  opinionDIV.id = "opinion";

  if (opinionSDO?.explanation) addNodeViewTitleAndText(opinionDIV, "Explanation:" , opinionSDO.explanation);
  if (opinionSDO?.authors) addNodeViewTitleAndTextList(opinionDIV, "Authors:", opinionSDO.authors,
    "badge-dark");

  el.appendChild(opinionDIV);
  customFieldView(opinionDIV.id, opinionSDO);
  if (opinionSDO?.external_references) {
    externalReferencesView(opinionDIV.id, opinionSDO.external_references);
  }
}
