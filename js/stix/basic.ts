import {OBSERVED_SDO_FIELDS} from './sdo/observed-sdo';
import {IDENTITY_SDO_FIELDS} from './sdo/identity';
import {SOFTWARE_SCO_FIELDS} from './sco/software';
import {DIRECTORY_SCO_FIELDS} from './sco/directory';
import {FILE_SCO_FIELDS} from './sco/file';
import {USER_ACCOUNT_SCO_FIELDS} from './sco/user-account';
import {NETWORK_TRAFFIC_SCO_FIELDS} from './sco/network-traffic';
// import {IPV4_SCO_FIELDS, IPV6_SCO_FIELDS} from './sco/ipv-sco';
import {SCHEDULED_TASK_SCO_FIELDS} from './sco/scheduled-task';
import {capitalize} from '../../js/graph/utils';

export interface Reference {
  source_name: string;
  url: string;
  external_id?: string;
}

export interface KillChainPhase {
  kill_chain_name: string;
  phase_name: string;
}

export interface BasicSTIX {
  id: string;
  type: string;
  spec_version: string;
}

export interface BasicSDOSRO extends BasicSTIX {
  created_by_ref?: string;
  created: Date;
  modified: Date;
  revoked?: boolean;
  labels?: string [];
  confidence?: number;
  lang?: string;
  external_references?: Reference [];
  object_marking_refs?: string [];
  granular_markings?: string [];
}

export interface STIXField {
  key: string;
  viewValue: string;
  type: string;
  typeName: string;
}

export interface STIXObject {
  unique_id?: string;
  custom?: boolean;
  id?: string;
}

export const STIX_FIELDS = [...OBSERVED_SDO_FIELDS, ...IDENTITY_SDO_FIELDS, ...SOFTWARE_SCO_FIELDS, ...DIRECTORY_SCO_FIELDS,
  ...FILE_SCO_FIELDS, ...USER_ACCOUNT_SCO_FIELDS, ...NETWORK_TRAFFIC_SCO_FIELDS, ...SCHEDULED_TASK_SCO_FIELDS];

/**
 * All custom keys defined in a SDO/SCO that start with x_ are displayed in a specific pattern
 * @param divId: The DIV id where the custom field values should be displayed
 * @param obj: Any SDO or SCO
 */
export function customFieldView (divId, obj) {
  let customKeys = Object.keys(obj).filter((key) => key.charAt(0) == "x" && key.charAt(1) == "_" );
  if (customKeys.length > 0) {
    const customDIV = document.createElement("div");
    customKeys.forEach(key => {
      customDIV.innerHTML += "<div class='mt-2'><b>" + reformatCustomKey(key) + ":</b></div>"
      if (Array.isArray(obj[key])) {
        //  Show as badges
        obj[key].forEach(item => customDIV.innerHTML +=
          "<span class='badge badge-pill badge-dark m-1'>" + item +"</span>")
      } else {
        customDIV.innerHTML += "<div><span>" + obj[key] + "</span></div>"
      }
    });
    document.getElementById(divId).appendChild(customDIV);
  }
}

/**
 * A custom key needs to be reformatted in a proper way. E.g x_phase_any -> Phase any
 * @param customKey: Any x_ key
 */
function reformatCustomKey (customKey: string) {
  return capitalize(customKey.replace("x_", "")).split("_").join(" ");
}

/**
 * Create External References View for SDOs
 * @param divId: Where the HTML should be applied
 * @param externalReferences: The External References given in a SDO
 */
export function externalReferencesView(divId, externalReferences: Reference []) {
  const referenceDIV = document.createElement("div");
  referenceDIV.innerHTML += "<span class='mt-2'><b>External References:</b></span><div id='accordion' class='mt-2'>";
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

export function addNodeViewTitleAndText(divEl, title: string, text: string) {
  addNodeViewTitle(divEl, title);
  addNodeViewText(divEl, text);
}

export function addNodeViewTitleAndTextList(divEl, title: string, textList: string [],
                                            badgeColor = "badge-primary") {
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

export function addNodeViewTextList(divEl, textList: string [], badgeColor = "badge-primary") {
  textList.forEach(alias => {
    divEl.innerHTML += "<span class='badge badge-pill m-1 " + badgeColor + "'>" + alias +"</span>";
  })
}

export function addKillChainPhases (divEl, killChainPhases: KillChainPhase []) {
  killChainPhases.forEach(phase => {
    if (phase?.phase_name && phase?.kill_chain_name) {
      divEl.innerHTML += "<li class='list-group-item'>" + capitalize(phase.kill_chain_name) +
        "<span class='badge badge-dark ml-1'>" + capitalize(phase.phase_name) + "</span>"
        + "</li>";
    }
  })
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
