"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STIX_FIELDS = exports.STIX_SDO_TYPES = void 0;
var observed_sdo_1 = require("./sdo/observed-sdo");
var identity_1 = require("./sdo/identity");
var software_1 = require("./sco/software");
var directory_1 = require("./sco/directory");
var file_1 = require("./sco/file");
var user_account_1 = require("./sco/user-account");
var network_traffic_1 = require("./sco/network-traffic");
var ipv_sco_1 = require("./sco/ipv-sco");
var scheduled_task_1 = require("./sco/scheduled-task");
var STIX_SDO_TYPES;
(function (STIX_SDO_TYPES) {
    STIX_SDO_TYPES["ATTACK_PATTERN"] = "Attack Pattern";
    STIX_SDO_TYPES["GROUPING"] = "Grouping";
    STIX_SDO_TYPES["IDENTITY"] = "Identity";
    STIX_SDO_TYPES["MALWARE"] = "Malware";
    STIX_SDO_TYPES["TOOL"] = "Tool";
    STIX_SDO_TYPES["THREAT_ACTOR"] = "Threat Actor";
    STIX_SDO_TYPES["VULNERABILITY"] = "Vulnerability";
    STIX_SDO_TYPES["OBSERVED_DATA"] = "Observed Data";
})(STIX_SDO_TYPES = exports.STIX_SDO_TYPES || (exports.STIX_SDO_TYPES = {}));
exports.STIX_FIELDS = __spreadArrays(observed_sdo_1.OBSERVED_SDO_FIELDS, identity_1.IDENTITY_SDO_FIELDS, software_1.SOFTWARE_SCO_FIELDS, directory_1.DIRECTORY_SCO_FIELDS, file_1.FILE_SCO_FIELDS, user_account_1.USER_ACCOUNT_SCO_FIELDS, network_traffic_1.NETWORK_TRAFFIC_SCO_FIELDS, ipv_sco_1.IPV4_SCO_FIELDS, ipv_sco_1.IPV6_SCO_FIELDS, scheduled_task_1.SCHEDULED_TASK_SCO_FIELDS);
