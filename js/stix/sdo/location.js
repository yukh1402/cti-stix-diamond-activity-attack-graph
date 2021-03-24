"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationView = exports.LOCATION_TYPE = void 0;
var basic_1 = require("../basic");
exports.LOCATION_TYPE = "location";
function getLocationView(titleId, contentId, typeId, locationSDO) {
    document.getElementById(titleId).innerHTML += locationSDO.name;
    document.getElementById(typeId).innerHTML += "Location";
    var el = document.getElementById(contentId);
    var locationDIV = document.createElement("div");
    locationDIV.id = "location";
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.description)
        basic_1.addNodeViewTitleAndText(locationDIV, "Description:", locationSDO.description);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.latitude)
        basic_1.addNodeViewTitleAndText(locationDIV, "Latitude:", locationSDO.latitude.toString());
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.longitude)
        basic_1.addNodeViewTitleAndText(locationDIV, "Longitude:", locationSDO.longitude.toString());
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.precision)
        basic_1.addNodeViewTitleAndText(locationDIV, "Precision:", locationSDO.precision.toString());
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.region)
        basic_1.addNodeViewTitleAndText(locationDIV, "Region:", locationSDO.region);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.country)
        basic_1.addNodeViewTitleAndText(locationDIV, "Country:", locationSDO.country);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.administrative_area)
        basic_1.addNodeViewTitleAndText(locationDIV, "Administrative Area:", locationSDO.administrative_area);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.city)
        basic_1.addNodeViewTitleAndText(locationDIV, "City:", locationSDO.city);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.street_address)
        basic_1.addNodeViewTitleAndText(locationDIV, "Street Address:", locationSDO.street_address);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.postal_code)
        basic_1.addNodeViewTitleAndText(locationDIV, "Postal Code:", locationSDO.postal_code);
    el.appendChild(locationDIV);
    basic_1.customFieldView(locationDIV, locationSDO);
    if (locationSDO === null || locationSDO === void 0 ? void 0 : locationSDO.external_references) {
        basic_1.externalReferencesView(locationDIV, locationSDO.external_references);
    }
}
exports.getLocationView = getLocationView;
