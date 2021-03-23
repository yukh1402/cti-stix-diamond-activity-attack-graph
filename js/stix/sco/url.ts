import {BasicSTIX, customFieldView} from "../basic";

export const URL_TYPE = "url";

export interface UrlSCO extends BasicSTIX {
  value: string;
}

export function getUrlView(titleId: string, contentId: string, typeId: string, urlSCO: UrlSCO) {
  document.getElementById(titleId).innerHTML += urlSCO.value;
  document.getElementById(typeId).innerHTML += "Url";

  let el = document.getElementById(contentId);
  const urlDIV = document.createElement("div");
  urlDIV.id = URL_TYPE;

  el.appendChild(urlDIV);
  customFieldView(urlDIV.id, urlSCO);
}
