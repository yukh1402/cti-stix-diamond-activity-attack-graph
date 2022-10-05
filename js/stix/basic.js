import {capitalize} from "../graph/utils.js";
import {buildGroupingCreateView, GROUPING_TYPE} from "./sdo/grouping.js";


/**
 * All custom keys defined in a SDO/SCO that start with x_ are displayed in a specific pattern
 * @param divId: The DIV id where the custom field values should be displayed
 * @param obj: Any SDO or SCO
 * @param allKeys: Display all fields and not only custom fields
 * @param exclude: A list of JSON Keys that need to be excluded during processing
 */
export function customFieldView (divId, obj, allKeys = false, exclude = []) {
  let customKeys = [];
  if (allKeys === false) {
    customKeys = Object.keys(obj).filter((key) => key.charAt(0) === "x" && key.charAt(1) === "_" );
  } else {
    customKeys = Object.keys(obj).filter((key) => key !== "id" && key !== "type" && key !== "spec_version");
  }
  if (customKeys.length > 0) {
    const customDIV = document.createElement("div");
    customKeys.forEach(key => {
      if (exclude.findIndex(entry => entry === key) === -1) {
        addNodeViewTitle(customDIV, reformatCustomKey(key) + ":");
        if (Array.isArray(obj[key])) {
          //  Show as badges
          addNodeViewTextList(customDIV, obj[key], "badge-dark");
        } else {
          addNodeViewText(customDIV, obj[key]);
        }
      }
    });
    document.getElementById(divId).appendChild(customDIV);
  }
}

/**
 * A custom key needs to be reformatted in a proper way. E.g x_phase_any -> Phase any
 * @param customKey: Any x_ key
 */
function reformatCustomKey (customKey) {
  return capitalize(customKey.replace("x_", "")).split("_").join(" ");
}

/**
 * Create External References View for SDOs
 * @param divId: Where the HTML should be applied
 * @param externalReferences: The External References given in a SDO
 */
export function externalReferencesView(divId, externalReferences) {
  const referenceDIV = document.createElement("div");
  referenceDIV.className = "mt-3";
  referenceDIV.innerHTML += "<span><b>External References:</b></span><div id='accordion' class='mt-2'>";
  let index = 0;
  externalReferences.forEach(ref => {
    referenceDIV.innerHTML += "<div class='card'><div class='card-header' id='heading" + index + "'>" +
      "      <h5 class='mb-0'>" +
      "        <button class='btn btn-link'>" +
      "         <a target='_blank' href='" + ref?.url +  "'>" +
      capitalize(ref.source_name) + getExternalId(ref?.external_id) +
      "        </a></button>" +
      "      </h5>" +
      "    </div>" +
      "</div>"
    index++;
  })
  document.getElementById(divId).appendChild(referenceDIV);
}

export function addNodeViewTitleAndText(divEl, title, text) {
  addNodeViewTitle(divEl, title);
  addNodeViewText(divEl, text);
}

export function addNodeViewTitleAndTextList(divEl, title, textList, badgeColor = "badge-primary") {
  addNodeViewTitle(divEl, title);
  addNodeViewTextList(divEl, textList, badgeColor);
}

export function addNodeViewTitle(divEl, title) {
  divEl.innerHTML += "<div class='mt-3'><b>"+ title + "</b></div>"
}

/**
 * Add text to a DIV element in the node view
 * @param divEl: DIV Element
 * @param text: Text that should be displayed inside the DIV
 */
export function addNodeViewText(divEl, text) {
  divEl.innerHTML +=
    "<div class='view-border-bottom'>" + text + "</div>";
}

export function addNodeViewTextList(divEl, textList, badgeColor = "badge-primary") {
  let badgeDIV = document.createElement("div");
  badgeDIV.className = "view-border-bottom";
  textList.forEach(alias => {
    badgeDIV.innerHTML += "<div><span class='badge badge-pill " + badgeColor + "'>" + alias +"</span></div>";
  })
  divEl.appendChild(badgeDIV);
}

export function addKillChainPhases (divEl, killChainPhases) {
  addNodeViewTitle(divEl, "Kill Chain Phases:");
  let killChainDIV = document.createElement("div");
  killChainDIV.className = "view-border-bottom";
  killChainPhases.forEach(phase => {
    if (phase?.phase_name && phase?.kill_chain_name) {
      killChainDIV.innerHTML += "<li class='list-group-item'>" + capitalize(phase.kill_chain_name) +
        "<span class='badge badge-dark ml-1'>" + capitalize(phase.phase_name) + "</span>"
        + "</li>";
    }
  })
  divEl.appendChild(killChainDIV);
}

export function getCustomSTIXView(contentId, typeId, data) {
  document.getElementById(typeId).innerHTML += capitalize(data.type);

  let el = document.getElementById(contentId);
  const dataDIV = document.createElement("div");
  dataDIV.id = data.type;

  el.appendChild(dataDIV);
  customFieldView(dataDIV.id, data, true);
}

/**
 * Get External ID if exists else return empty string
 */
function getExternalId(externalId) {
  if (externalId !== undefined) {
    return " - " + externalId;
  } else {
    return "";
  }
}


/**
 * Load STIX Object create form
 */
export function loadCreateSTIXForm(STIXType, divID, titleID, typeID) {
  switch (STIXType) {
    case GROUPING_TYPE:
      return buildGroupingCreateView(divID, titleID, typeID)
  }
}
