"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPvView = exports.IPV6_TYPE = exports.IPV4_TYPE = void 0;
var basic_1 = require("../basic");
exports.IPV4_TYPE = "ipv4-addr";
exports.IPV6_TYPE = "ipv6-addr";
function getIPvView(ipvType, titleId, contentId, typeId, ip) {
    document.getElementById(titleId).innerHTML += ip.value;
    document.getElementById(typeId).innerHTML += ipvType === exports.IPV4_TYPE ? "IPv4-Addr" : "IPv6-Addr";
    var el = document.getElementById(contentId);
    var ipDIV = document.createElement("div");
    ipDIV.id = ipvType;
    el.appendChild(ipDIV);
    basic_1.customFieldView(ipDIV.id, ip);
}
exports.getIPvView = getIPvView;
