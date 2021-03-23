import {
  addNodeViewText,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView, externalReferencesView
} from "../basic";

export const NOTE_TYPE = "note";

export interface NoteSDO extends BasicSDOSRO {
  abstract?: string;
  content: string;
  authors?: string [];
  object_refs: string [];
}

export function getNoteView(titleId: string, contentId: string, typeId: string, noteSDO: NoteSDO) {
  document.getElementById(titleId).innerHTML += noteSDO.content.length > 20 ?
    noteSDO.content.slice(0, 20) + "...": noteSDO.content;
  document.getElementById(typeId).innerHTML += "Note";

  let el = document.getElementById(contentId);
  const noteDIV = document.createElement("div");
  noteDIV.id = "note";

  if (noteSDO?.content) addNodeViewText(noteDIV, noteSDO.content);
  if (noteSDO?.abstract) addNodeViewTitleAndText(noteDIV, "Abstract:",
    noteSDO.abstract);
  if (noteSDO?.authors) addNodeViewTitleAndTextList(noteDIV, "Authors:",
    noteSDO.authors, "badge-dark");

  el.appendChild(noteDIV);
  customFieldView(noteDIV.id, noteSDO);
  if (noteSDO?.external_references) {
    externalReferencesView(noteDIV.id, noteSDO.external_references);
  }
}
