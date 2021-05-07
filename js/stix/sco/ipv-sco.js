import {
  customFieldView,
} from "../basic.js";

export const IPV4_TYPE = "ipv4-addr";
export const IPV6_TYPE = "ipv6-addr";

export function getIPvView(ipvType, titleId, contentId, typeId, ip) {
  document.getElementById(titleId).innerHTML += ip.value;
  document.getElementById(typeId).innerHTML += ipvType === IPV4_TYPE ? "IPv4-Addr": "IPv6-Addr";

  let el = document.getElementById(contentId);
  const ipDIV = document.createElement("div");
  ipDIV.id = ipvType;

  el.appendChild(ipDIV);
  customFieldView(ipDIV.id, ip);
}
