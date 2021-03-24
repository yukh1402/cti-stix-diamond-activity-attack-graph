import {
  addNodeViewText, addNodeViewTextList,
  addNodeViewTitle, addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  BasicSDOSRO,
  customFieldView,
  externalReferencesView,
  STIXField,
  STIXObject
} from '../basic';

export const IDENTITY_TYPE = "identity"


export const IDENTITY_SDO_FIELDS: STIXField [] = [
  {key: "name", viewValue: "Hostname", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_dns_hostname", viewValue: "DNS Hostname", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_product_name", viewValue: "OS", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_architecture", viewValue: "OS architecture", type: 'identity', typeName: 'Identity SDO'},
  {key: "x_os_timezone", viewValue: "OS timezone", type: 'identity', typeName: 'Identity SDO'}
];

export interface IdentitySDO extends BasicSDOSRO {
  description?: string;
  roles?: string [];
  sectors?: string [];
  contact_information: string;
  name: string;
  identity_class?: string;
}

export function getIdentityView(titleId: string, contentId: string, typeId: string, identitySDO: IdentitySDO) {
  document.getElementById(titleId).innerHTML += identitySDO.name;
  document.getElementById(typeId).innerHTML += "Identity";

  let el = document.getElementById(contentId);
  const identityDIV = document.createElement("div");
  identityDIV.id = "identity";

  if (identitySDO?.description) addNodeViewTitleAndText(identityDIV, "Description:" ,identitySDO.description);
  if (identitySDO?.roles) addNodeViewTitleAndTextList(identityDIV, "Roles:", identitySDO.roles,
    "badge-dark");
  if (identitySDO?.sectors) addNodeViewTitleAndTextList(identityDIV, "Sectors:", identitySDO.sectors,
    "badge-dark");
  if (identitySDO?.identity_class) addNodeViewTitleAndText(identityDIV, "Identity class:",
    identitySDO.identity_class)
  if (identitySDO?.contact_information) addNodeViewTitleAndText(identityDIV, "Contact Information:",
    identitySDO.contact_information)

  el.appendChild(identityDIV);
  customFieldView(identityDIV.id, identitySDO);
  if (identitySDO?.external_references) {
    externalReferencesView(identityDIV.id, identitySDO.external_references);
  }
}
