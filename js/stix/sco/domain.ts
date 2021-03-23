import {BasicSTIX, customFieldView} from "../basic";
import {IPV4_TYPE} from "./ipv-sco";

export const DOMAIN_TYPE = "domain-name";

export interface DomainSCO extends BasicSTIX {
  value: string;
  resolves_to_refs?: string [];
}

export function getDomainView(titleId: string, contentId: string, typeId: string, domainSCO: DomainSCO) {
  document.getElementById(titleId).innerHTML += domainSCO.value;
  document.getElementById(typeId).innerHTML += "Domain Name";

  let el = document.getElementById(contentId);
  const domainDIV = document.createElement("div");
  domainDIV.id = DOMAIN_TYPE;

  el.appendChild(domainDIV);
  customFieldView(domainDIV.id, domainSCO);
}
