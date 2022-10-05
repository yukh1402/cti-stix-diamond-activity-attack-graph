import {customFieldView} from "../basic.js";

export const ARTIFACT_TYPE = "artifact";

export function getArtifactView(titleId, contentId, typeId, artifactSCO) {
  document.getElementById(titleId).innerHTML += artifactSCO.x_name;
  document.getElementById(typeId).innerHTML += "Artifact";

  let el = document.getElementById(contentId);
  const artifactDIV = document.createElement("div");
  artifactDIV.id = ARTIFACT_TYPE;

  el.appendChild(artifactDIV);
  customFieldView(artifactDIV.id, artifactSCO, true, ["x_name"]);
}
