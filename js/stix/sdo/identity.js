import {
  addNodeViewTitleAndText, addNodeViewTitleAndTextList,
  customFieldView,
  externalReferencesView
} from '../basic';

export const IDENTITY_TYPE = "identity"

export function getIdentityView(titleId, contentId, typeId, identitySDO) {
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
