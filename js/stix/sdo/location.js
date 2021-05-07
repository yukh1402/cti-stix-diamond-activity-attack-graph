import {
  addNodeViewTitleAndText,
  customFieldView,
  externalReferencesView
} from "../basic";

export const LOCATION_TYPE = "location";

export function getLocationView(titleId, contentId, typeId, locationSDO) {
  document.getElementById(titleId).innerHTML += locationSDO.name;
  document.getElementById(typeId).innerHTML += "Location";

  let el = document.getElementById(contentId);
  const locationDIV = document.createElement("div");
  locationDIV.id = "location";

  if (locationSDO?.description) addNodeViewTitleAndText(locationDIV, "Description:", locationSDO.description);
  if (locationSDO?.latitude) addNodeViewTitleAndText(locationDIV, "Latitude:", locationSDO.latitude.toString());
  if (locationSDO?.longitude) addNodeViewTitleAndText(locationDIV, "Longitude:", locationSDO.longitude.toString());
  if (locationSDO?.precision) addNodeViewTitleAndText(locationDIV, "Precision:", locationSDO.precision.toString());
  if (locationSDO?.region) addNodeViewTitleAndText(locationDIV, "Region:", locationSDO.region);
  if (locationSDO?.country) addNodeViewTitleAndText(locationDIV, "Country:", locationSDO.country);
  if (locationSDO?.administrative_area) addNodeViewTitleAndText(locationDIV, "Administrative Area:",
    locationSDO.administrative_area);
  if (locationSDO?.city) addNodeViewTitleAndText(locationDIV, "City:", locationSDO.city);
  if (locationSDO?.street_address) addNodeViewTitleAndText(locationDIV, "Street Address:",
    locationSDO.street_address);
  if (locationSDO?.postal_code) addNodeViewTitleAndText(locationDIV, "Postal Code:", locationSDO.postal_code);

  el.appendChild(locationDIV);
  customFieldView(locationDIV.id, locationSDO);

  if (locationSDO?.external_references) {
    externalReferencesView(locationDIV, locationSDO.external_references);
  }
}
