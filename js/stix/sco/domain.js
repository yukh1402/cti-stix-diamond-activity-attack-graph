import {customFieldView} from "../basic.js";

export const DOMAIN_TYPE = "domain-name";

export function getDomainView(titleId, contentId, typeId, domainSCO) {
  document.getElementById(titleId).innerHTML += domainSCO.value;
  document.getElementById(typeId).innerHTML += "Domain Name";

  let el = document.getElementById(contentId);
  const domainDIV = document.createElement("div");
  domainDIV.id = DOMAIN_TYPE;

  el.appendChild(domainDIV);
  customFieldView(domainDIV.id, domainSCO);
}
