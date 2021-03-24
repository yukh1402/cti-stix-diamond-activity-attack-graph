import {
  addNodeViewText,
  addNodeViewTitleAndText,
  addNodeViewTitleAndTextList,
  BasicSTIX,
  customFieldView, externalReferencesView,
  STIXField
} from '../basic';

export const IPV4_TYPE = "ipv4-addr";
export const IPV6_TYPE = "ipv6-addr";

interface IP extends BasicSTIX {
  value: string;
  resolves_to_refs?: string [];
  belongs_to_refs?: string [];
}

export interface IPv4SCO extends IP {
}

export interface IPv6SCO extends IP {
}

export function getIPvView(ipvType: string, titleId: string, contentId: string, typeId: string, ip: IP) {
  document.getElementById(titleId).innerHTML += ip.value;
  document.getElementById(typeId).innerHTML += ipvType === IPV4_TYPE ? "IPv4-Addr": "IPv6-Addr";

  let el = document.getElementById(contentId);
  const ipDIV = document.createElement("div");
  ipDIV.id = ipvType;

  el.appendChild(ipDIV);
  customFieldView(ipDIV.id, ip);
}
