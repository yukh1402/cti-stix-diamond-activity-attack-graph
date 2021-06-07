import {addNodeViewTextList, addNodeViewTitleAndText, addNodeViewTitleAndTextList, customFieldView} from "../basic";

export const SOFTWARE_TYPE = "software";


export function getSoftwareView(titleId, contentId, typeId, softwareSCO) {
  document.getElementById(titleId).innerHTML += softwareSCO?.name;
  document.getElementById(typeId).innerHTML += "Software";

  let el = document.getElementById(contentId);
  const softwareDIV = document.createElement("div");
  softwareDIV.id = "software";

  if (softwareSCO?.cpe) addNodeViewTitleAndText(softwareDIV, "CPE:", softwareSCO.cpe);
  if (softwareSCO?.swid) addNodeViewTitleAndText(softwareDIV, "SWID:", softwareSCO.swid);
  if (softwareSCO?.languages) addNodeViewTitleAndTextList(softwareDIV, "Languages:", softwareSCO.languages);
  if (softwareSCO?.vendor) addNodeViewTitleAndText(softwareDIV, "Vendor:", softwareSCO.vendor);
  if (softwareSCO?.version) addNodeViewTitleAndText(softwareDIV, "Version:", softwareSCO.version);

  el.appendChild(softwareDIV);
  customFieldView(softwareDIV.id, softwareSCO);
}
