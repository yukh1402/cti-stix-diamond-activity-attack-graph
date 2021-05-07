import {customFieldView} from "../basic.js";

export const URL_TYPE = "url";

export function getUrlView(titleId, contentId, typeId, urlSCO) {
  document.getElementById(titleId).innerHTML += urlSCO.value;
  document.getElementById(typeId).innerHTML += "Url";

  let el = document.getElementById(contentId);
  const urlDIV = document.createElement("div");
  urlDIV.id = URL_TYPE;

  el.appendChild(urlDIV);
  customFieldView(urlDIV.id, urlSCO);
}
