import {capitalize} from "../../graph/utils.js";

export const GROUPING_TYPE = "grouping";

export function buildGroupingCreateView(containerID, titleID, typeID) {
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "grouping-name";
  nameInput.className = "form-control";
  nameInput.setAttribute("placeholder", "Name");

  document.getElementById(typeID).innerText = capitalize(GROUPING_TYPE);
  document.getElementById(titleID).appendChild(nameInput);

  let description = document.createElement("textarea");
  description.type = "text";
  description.id = "groupingDesc";
  description.className = "w-100 form-control"
  description.setAttribute("placeholder", "Description");
  description.setAttribute("rows", "5");

  document.getElementById(containerID).appendChild(description);

}
