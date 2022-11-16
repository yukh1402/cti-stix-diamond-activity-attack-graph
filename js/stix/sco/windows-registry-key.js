import {addNodeViewTitle, addNodeViewTitleAndText, customFieldView} from "../basic.js";
import {capitalize} from "../../graph/utils";

export const WINDOWS_REGISTRY_KEY_TYPE = "windows-registry-key";


export function getWindowsRegistryKeyView(titleId, contentId, typeId, winRegKeySCO) {
  document.getElementById(titleId).innerHTML += winRegKeySCO?.key && winRegKeySCO?.key.length > 20
    ? winRegKeySCO?.key.substr(0,20) + "..." : winRegKeySCO?.key ? winRegKeySCO.key: "";
  document.getElementById(typeId).innerHTML += "Windows Registry Key";

  let el = document.getElementById(contentId);
  const winRegKeyDIV = document.createElement("div");
  winRegKeyDIV.id = "win-reg-key";

  if (winRegKeySCO?.modified_time) addNodeViewTitleAndText(winRegKeyDIV, "Modified time",
    new Date(winRegKeySCO.modified_time).toUTCString());

  if (winRegKeySCO?.values) {
    addNodeViewTitle(winRegKeyDIV, "Values:");
    winRegKeySCO.values.forEach(item => {
      let objs = []
      Object.keys(item).forEach(key => objs.push("<div><b>" + capitalize(key) + ":</b> " + item[key]  + "</div>"));
      console.log(objs)
      if (objs.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = "<div class='card mb-1'><div class='card-body'>" + objs.join("") + "</div></div>";
        winRegKeyDIV.appendChild(div);
      }
    })
  }

  el.appendChild(winRegKeyDIV);
  customFieldView(winRegKeyDIV.id, winRegKeySCO, true, ["values", "creator_user_ref", "modified_time"]);
}
