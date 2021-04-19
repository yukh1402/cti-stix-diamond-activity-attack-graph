import {ATTACK_PATTERN_TYPE, getAttackPatternView} from "../stix/sdo/attack-pattern";
import {Graph, Link, Node} from "./node";
import {GROUPING_TYPE} from "../stix/sdo/grouping";
import {RELATIONSHIP_TYPE} from "../stix/sro/relationship";
import {getThreatActorView, THREAT_ACTOR_TYPE} from "../stix/sdo/threat-actor";
import {CAMPAIGN_TYPE, getCampaignView} from "../stix/sdo/campaign";
import {getIntrusionSetView, INTRUSION_SET_TYPE} from "../stix/sdo/intrusion-set";
import {getVulnerabilityView, VULNERABILITY_TYPE} from "../stix/sdo/vulnerability";
import {getToolView, TOOL_TYPE} from "../stix/sdo/tool";
import {getMalwareView, MALWARE_TYPE} from "../stix/sdo/malware";
import {getInfrastructureView, INFRASTRUCTURE_TYPE} from "../stix/sdo/infrastructure";
import {getObservedDataView, OBSERVED_DATA_TYPE} from "../stix/sdo/observed-sdo";
import {getIdentityView, IDENTITY_TYPE} from "../stix/sdo/identity";
import {getIndicatorView, INDICATOR_TYPE} from "../stix/sdo/indicator";
import {getLocationView, LOCATION_TYPE} from "../stix/sdo/location";
import {getMalwareAnalysisView, MALWARE_ANALYSIS_TYPE} from "../stix/sdo/malware-analysis";
import {COURSE_OF_ACTION_TYPE, getCourseOfActionView} from "../stix/sdo/course-of-action";
import {getIncidentView, INCIDENT_TYPE} from "../stix/sdo/incident";
import {capitalize} from "./utils";
import {getNoteView, NOTE_TYPE} from "../stix/sdo/note";
import {getOpinionView, OPINION_TYPE} from "../stix/sdo/opinion";
import {getReportView, REPORT_TYPE} from "../stix/sdo/report";
import {getIPvView, IPV4_TYPE, IPV6_TYPE} from "../stix/sco/ipv-sco";
import {DOMAIN_TYPE, getDomainView} from "../stix/sco/domain";
import {getUrlView, URL_TYPE} from "../stix/sco/url";
import {FILE_TYPE, getFileView} from "../stix/sco/file";
import {DIRECTORY_TYPE, getDirectoryView} from "../stix/sco/directory";
import {getProcessView, PROCESS_TYPE} from "../stix/sco/process";
import {getCustomSTIXView} from "../stix/basic";

export const MITRE_ATTACK_CATEGORIES = [
  "Reconnaissance", "Resource Development", "Initial Access", "Execution", "Persistence", "Privilege Escalation",
  "Defense Evasion", "Credential Access", "Discovery", "Lateral Movement", "Collection", "Command and Control",
  "Exfiltration", "Impact"]

export const DIAMOND_MODEL_META_FEATURE_CATEGORIES = [
  "Victim", "Infrastructure", "Capabilities", "Adversary"
]

export const TTP_Y_AXIS = [
  [
    {ttp: "T1595", category: "reconnaissance"},
    {ttp: "T1583", category: "resource-development"},
    {ttp: "T1189", category: "initial-access"},
    {ttp: "T1059", category: "execution"},
    {ttp: "T1098", category: "persistence"},
    {ttp: "T1548", category: "privilege-escalation"},
    {ttp: "T1548", category: "defense-evasion"},
    {ttp: "T1110", category: "credential-access"},
    {ttp: "T1087", category: "discovery"},
    {ttp: "T1210", category: "lateral-movement"},
    {ttp: "T1560", category: "collection"},
    {ttp: "T1071", category: "command-and-control"},
    {ttp: "T1020", category: "exfiltration"},
    {ttp: "T1531", category: "impact"}
  ],
  [
    {ttp: "T1592", category: "reconnaissance"},
    {ttp: "T1586", category: "resource-development"},
    {ttp: "T1190", category: "initial-access"},
    {ttp: "T1203", category: "execution"},
    {ttp: "T1197", category: "persistence"} ,
    {ttp: "T1134", category: "privilege-escalation"},
    {ttp: "T1134", category: "defense-evasion"},
    {ttp: "T1555", category: "credential-access"},
    {ttp: "T1010", category: "discovery"},
    {ttp: "T1534", category: "lateral-movement"},
    {ttp: "T1123", category: "collection"},
    {ttp: "T1092", category: "command-and-control"},
    {ttp: "T1030", category: "exfiltration"},
    {ttp: "T1485", category: "impact"}
  ],
  [
    {ttp: "T1589", category: "reconnaissance"},
    {ttp: "T1584", category: "resource-development"},
    {ttp: "T1133", category: "initial-access"},
    {ttp: "T1559", category: "execution"},
    {ttp: "T1547", category: "persistence"},
    {ttp: "T1547", category: "privilege-escalation"},
    {ttp: "T1197", category: "defense-evasion"},
    {ttp: "T1212", category: "credential-access"},
    {ttp: "T1217", category: "discovery"},
    {ttp: "T1570", category: "lateral-movement"},
    {ttp: "T1119", category: "collection"},
    {ttp: "T1132", category: "command-and-control"},
    {ttp: "T1048", category:  "exfiltration"},
    {ttp: "T1486", category: "impact"}
  ],
  [
    {ttp: "T1590", category: "reconnaissance"},
    {ttp: "T1587", category: "resource-development"},
    {ttp: "T1200", category: "initial-access"},
    {ttp: "T1106", category: "execution"},
    {ttp: "T1037", category: "persistence"},
    {ttp: "T1037", category: "privilege-escalation"},
    {ttp: "T1140", category: "defense-evasion"},
    {ttp: "T1187", category: "credential-access"},
    {ttp: "T1580", category: "discovery"},
    {ttp: "T1563", category: "lateral-movement"},
    {ttp: "T1115", category: "collection"},
    {ttp: "T1001", category: "command-and-control"},
    {ttp: "T1041", category:  "exfiltration"},
    {ttp: "T1565", category: "impact"}
  ],
  [
    {ttp: "T1591", category: "reconnaissance"},
    {ttp: "T1585", category: "resource-development"},
    {ttp: "T1566", category: "initial-access"},
    {ttp: "T1053", category: "execution"},
    {ttp: "T1176", category: "persistence"},
    {ttp: "T1543", category: "privilege-escalation"},
    {ttp: "T1006", category: "defense-evasion"},
    {ttp: "T1606", category: "credential-access"},
    {ttp: "T1538", category: "discovery"},
    {ttp: "T1021", category: "lateral-movement"},
    {ttp: "T1530", category: "collection"},
    {ttp: "T1568", category: "command-and-control"},
    {ttp: "T1011", category:  "exfiltration"},
    {ttp: "T1491", category: "impact"}
  ],
  [
    {ttp: "T1598", category: "reconnaissance"},
    {ttp: "T1588", category: "resource-development"},
    {ttp: "T1091", category: "initial-access"},
    {ttp: "T1129", category: "execution"},
    {ttp: "T1554", category: "persistence"},
    {ttp: "T1484", category: "privilege-escalation"},
    {ttp: "T1484", category: "defense-evasion"},
    {ttp: "T1056", category: "credential-access"},
    {ttp: "T1526", category: "discovery"},
    {ttp: "T1091", category: "lateral-movement"},
    {ttp: "T1602", category: "collection"},
    {ttp: "T1573", category: "command-and-control"},
    {ttp: "T1052", category:  "exfiltration"},
    {ttp: "T1561", category: "impact"}
  ],
  [
    {ttp: "T1597", category: "reconnaissance"},
    // {ttp: "T1588", category: "resource-development"},
    {ttp: "T1195", category: "initial-access"},
    {ttp: "T1072", category: "execution"},
    {ttp: "T1136", category: "persistence"},
    {ttp: "T1546", category: "privilege-escalation"},
    {ttp: "T1480", category: "defense-evasion"},
    {ttp: "T1557", category: "credential-access"},
    {ttp: "T1482", category: "discovery"},
    {ttp: "T1072", category: "lateral-movement"},
    {ttp: "T1213", category: "collection"},
    {ttp: "T1008", category: "command-and-control"},
    {ttp: "T1567", category:  "exfiltration"},
    {ttp: "T1499", category: "impact"}
  ],
  [
    {ttp: "T1596", category: "reconnaissance"},
    {ttp: "T1199", category: "initial-access"},
    {ttp: "T1569", category: "execution"},
    {ttp: "T1543", category: "persistence"},
    {ttp: "T1068", category: "privilege-escalation"},
    {ttp: "T1211", category: "defense-evasion"},
    {ttp: "T1556", category: "credential-access"},
    {ttp: "T1083", category: "discovery"},
    {ttp: "T1080", category: "lateral-movement"},
    {ttp: "T1005", category: "collection"},
    {ttp: "T1105", category: "command-and-control"},
    {ttp: "T1029", category:  "exfiltration"},
    {ttp: "T1495", category: "impact"}
  ],
  [
    {ttp: "T1593", category: "reconnaissance"},
    {ttp: "T1078", category: "initial-access"},
    {ttp: "T1204", category: "execution"},
    {ttp: "T1546", category: "persistence"},
    {ttp: "T1574", category: "privilege-escalation"},
    {ttp: "T1222", category: "defense-evasion"},
    {ttp: "T1040", category: "credential-access"},
    {ttp: "T1046", category: "discovery"},
    {ttp: "T1550", category: "lateral-movement"},
    {ttp: "T1039", category: "collection"},
    {ttp: "T1104", category: "command-and-control"},
    {ttp: "T1537", category:  "exfiltration"},
    {ttp: "T1490", category: "impact"}
  ],
  [
    {ttp: "T15934", category: "reconnaissance"},
    {ttp: "T1047", category: "execution"},
    {ttp: "T1133", category: "persistence"},
    {ttp: "T1055", category: "privilege-escalation"},
    {ttp: "T1564", category: "defense-evasion"},
    {ttp: "T1003", category: "credential-access"},
    {ttp: "T1135", category: "discovery"},
    {ttp: "T1025", category: "collection"},
    {ttp: "T1095", category: "command-and-control"},
    {ttp: "T1498", category: "impact"}
  ],
  [
    {ttp: "T1574", category: "persistence"},
    {ttp: "T1053", category: "privilege-escalation"},
    {ttp: "T1574", category: "defense-evasion"},
    {ttp: "T1528", category: "credential-access"},
    {ttp: "T1040", category: "discovery"},
    {ttp: "T1074", category: "collection"},
    {ttp: "T1571", category: "command-and-control"},
    {ttp: "T1496", category: "impact"}
  ],
  [
    {ttp: "T1525", category: "persistence"},
    {ttp: "T1078", category: "privilege-escalation"},
    {ttp: "T1562", category: "defense-evasion"},
    {ttp: "T1558", category: "credential-access"},
    {ttp: "T1201", category: "discovery"},
    {ttp: "T1114", category: "collection"},
    {ttp: "T1572", category: "command-and-control"},
    {ttp: "T1489", category: "impact"}
  ],
  [
    {ttp: "T1137", category: "persistence"},
    {ttp: "T1070", category: "defense-evasion"},
    {ttp: "T1539", category: "credential-access"},
    {ttp: "T1120", category: "discovery"},
    {ttp: "T1056", category: "collection"},
    {ttp: "T1090", category: "command-and-control"},
    {ttp: "T1529", category: "impact"}
  ],
  [
    {ttp: "T1542", category: "persistence"},
    {ttp: "T1202", category: "defense-evasion"},
    {ttp: "T1111", category: "credential-access"},
    {ttp: "T1069", category: "discovery"},
    {ttp: "T1185", category: "collection"},
    {ttp: "T1219", category: "command-and-control"},
  ],
  [
    {ttp: "T1053", category: "persistence"},
    {ttp: "T1036", category: "defense-evasion"},
    {ttp: "T1552", category: "credential-access"},
    {ttp: "T1057", category: "discovery"},
    {ttp: "T1557", category: "collection"},
    {ttp: "T1205", category: "command-and-control"} // 15
  ],
  [
    {ttp: "T1505", category: "persistence"},
    {ttp: "T1556", category: "defense-evasion"},
    {ttp: "T1012", category: "discovery"},
    {ttp: "T1113", category: "collection"},
    {ttp: "T1102", category: "command-and-control"} // 16
  ],
  [
    {ttp: "T1205", category: "persistence"},
    {ttp: "T1578", category: "defense-evasion"},
    {ttp: "T1018", category: "discovery"},
    {ttp: "T1125", category: "collection"} // 17
  ],
  [
    {ttp: "T1078", category: "persistence"},
    {ttp: "T1112", category: "defense-evasion"},
    {ttp: "T1518", category: "discovery"}
  ],
  [
    {ttp: "T1601", category: "defense-evasion"},
    {ttp: "T1082", category: "discovery"}
  ],
  [
    {ttp: "T1599", category: "defense-evasion"},
    {ttp: "T1016", category: "discovery"}
  ],
  [
    {ttp: "T1027", category: "defense-evasion"},
    {ttp: "T1049", category: "discovery"}
  ],
  [
    {ttp: "T1542", category: "defense-evasion"},
    {ttp: "T1033", category: "discovery"}
  ],
  [
    {ttp: "T1055", category: "defense-evasion"},
    {ttp: "T1007", category: "discovery"}
  ],
  [
    {ttp: "T1207", category: "defense-evasion"},
    {ttp: "T1124", category: "discovery"}
  ],
  [
    {ttp: "T1014", category: "defense-evasion"},
    {ttp: "T1497", category: "discovery"}
  ],
  [
    {ttp: "T1218", category: "defense-evasion"}
  ],
  [
    {ttp: "T1216", category: "defense-evasion"}
  ],
  [
    {ttp: "T1553", category: "defense-evasion"}
  ],
  [
    {ttp: "T1221", category: "defense-evasion"}
  ],
  [
    {ttp: "T1205", category: "defense-evasion"}
  ],
  [
    {ttp: "T1127", category: "defense-evasion"}
  ],
  [
    {ttp: "T1535", category: "defense-evasion"}
  ],
  [
    {ttp: "T1550", category: "defense-evasion"}
  ],
  [
    {ttp: "T1078", category: "defense-evasion"}
  ],
  [
    {ttp: "T1497", category: "defense-evasion"}
  ],
  [
    {ttp: "T1600", category: "defense-evasion"}
  ],
  [
    {ttp: "T1220", category: "defense-evasion"}
  ]
]

/**
 * Get the TTP number from an Attack Pattern Stix Domain Object. The TTP number is mostly defined in the
 * external_id field of an external_reference.
 * @param node: An Attack Pattern SDO
 */
export function getTTP(node) {
  return node.data.external_references[0].external_id;
}

/**
 * Get the TTP Y-Axis Id for the Attack Graph
 * @param ttpNumber: The technique, tactic and procedure number from Mitre Attack
 * @param tactic: The Mitre Attack Tactic category
 */
export function getTTPAxisId(ttpNumber, tactic) {
  return TTP_Y_AXIS.findIndex(ttpList => ttpList.find(ttp => ttpNumber.includes(ttp.ttp)
    && ttp.category === tactic.toLowerCase().split(" ").join("-")));
}

/**
 * Get TTP tatic category from Attack Pattern SDO
 * @param node: Attack Pattern SDO Node
 */
export function getTactic(node) {
  return node.data.kill_chain_phases[0].phase_name;
}


/**
 * Parse the Tactic name to the X-Axis Category format
 */
export function parseTacticNameToXAxis(tactic) {
  let string = "";
  let words = tactic.split("-");
  words.forEach(word => {
    if (word.toLowerCase() === "and") {
      string += "and ";
    } else {
      string += capitalize(word) + " ";
    }
  })
  return string.trim();
}

/**
 * Parse a STIX Bundle to a Node structure for creating a Mitre Attack Graph. Only Grouping SDOs with an
 * Attack Pattern SDO are considered.
 * @param bundle
 * @return Graph
 */
export function parseBundleToGraph(bundle) {
  let nodes = [];
  let groupingLinks = [];

  // Add all Grouping SDOs
  bundle.objects
    .filter(obj => obj.type === GROUPING_TYPE && obj?.object_refs.find(ref => ref.includes(ATTACK_PATTERN_TYPE)))
    .forEach(obj => nodes.push(new Node(obj.id, obj, obj.type, buildSubGraphForGrouping(obj, bundle))))

  // Add all Grouping relationships
  bundle.objects
    .filter(obj => obj.type === RELATIONSHIP_TYPE)
    .filter(obj => obj.source_ref.includes(GROUPING_TYPE) && obj.target_ref.includes(GROUPING_TYPE))
    .forEach(obj => {
      let source_index = nodes.findIndex(no => no.id === obj.source_ref);
      let target_index = nodes.findIndex(no => no.id === obj.target_ref);
      if (source_index > -1 && target_index > -1) {
        groupingLinks.push(
          new Link(source_index, target_index, obj, obj.relationship_type));
      }
    })
  return new Graph(nodes, groupingLinks);
}

function buildSubGraphForGrouping(grouping, bundle) {
  let childNodes = [];
  let childLinks = [];
  grouping.object_refs.forEach(ref => {
    // console.log(ref)
    // The grouping reference object that is found in the bundle
    let foundObj = bundle.objects.find(obj => {
      return obj.id === ref
    });

    if (foundObj !== undefined) {
      // Grouping Objects are not allowed in the Subgraph
      if (!foundObj.id.includes(GROUPING_TYPE)) {
        if (!foundObj.id.includes(RELATIONSHIP_TYPE)) {
          childNodes.push(new Node(foundObj.id, foundObj, foundObj.type, undefined, grouping.id));
        }
      }
    }
  });

  // Get all links
  grouping.object_refs.forEach(ref => {
    let foundObj = bundle.objects.find(obj => obj.id === ref);
    if (foundObj !== undefined) {
      if (foundObj.id.includes(RELATIONSHIP_TYPE)) {
        // Dont push relationship obj if target or source ref is a grouping object or relationship obj already exists in childlinks
        if (!foundObj.source_ref.includes(GROUPING_TYPE) && !foundObj.target_ref.includes(GROUPING_TYPE)
          && !childLinks.find(link => link.data.id === foundObj.id)) {
          let source_ref_index = childNodes.findIndex(no => no.id === foundObj.source_ref);
          let target_ref_index = childNodes.findIndex(no => no.id === foundObj.target_ref);
          if (source_ref_index === -1) {
            let findSourceObj = bundle.objects.find(obj => obj.id === foundObj.source_ref);
            childNodes.push(new Node(findSourceObj.id, findSourceObj, findSourceObj.type, undefined, grouping.id));
          }
          if (target_ref_index === -1) {
            let findTargetObj = bundle.objects.find(obj => obj.id === foundObj.target_ref);
            childNodes.push(new Node(findTargetObj.id, findTargetObj, findTargetObj.type, undefined, grouping.id));
          }
          childLinks.push(
            new Link(
              childNodes.findIndex(no => no.id === foundObj.source_ref),
              childNodes.findIndex(no => no.id === foundObj.target_ref), foundObj, foundObj.relationship_type));
        }
      }
      // Get all relationship objects for foundObj
      // bundle.objects.forEach(obj => {
      //   if (obj.id.includes(RELATIONSHIP_TYPE)) {
      //     if (!childLinks.find(rel => rel.data.id === obj.id)
      //       && (obj.source_ref === foundObj.id || obj.target_ref === foundObj.id)) {
      //
      //       let source_ref_index = childNodes.findIndex(no => no.id === obj.source_ref);
      //       let target_ref_index = childNodes.findIndex(no => no.id === obj.target_ref);
      //       if (source_ref_index === -1) {
      //         let findSourceObj = bundle.objects.find(ob => ob.id === obj.source_ref);
      //         childNodes.push(new Node(findSourceObj.id, findSourceObj, findSourceObj.type, undefined, grouping.id));
      //       }
      //       if (target_ref_index === -1) {
      //         let findTargetObj = bundle.objects.find(ob => ob.id === obj.target_ref);
      //         childNodes.push(new Node(findTargetObj.id, findTargetObj, findTargetObj.type, undefined, grouping.id));
      //       }
      //
      //       childLinks.push(
      //         new Link(
      //           childNodes.findIndex(no => no.id === obj.source_ref),
      //           childNodes.findIndex(no => no.id === obj.target_ref), obj, obj.relationship_type
      //         )
      //       );
      //     }
      //   }
      // })
    }
  });
  return new Graph(childNodes, childLinks);
}

/**
 * Get all Attack Pattern STIX Domain objects from all Grouping SDOs
 * @param graph
 */
export function getNodesWithAttackPattern(graph) {
  return [].concat.apply([], graph.nodes.map(node => {
    let attackPattern = node.subGraph.nodes.map(no => {
      if (no.type === ATTACK_PATTERN_TYPE) {
        no.groupingId = node.id;
        return no;
      }
    }).filter(n => n !== undefined);
    if (attackPattern.length > 0) return attackPattern;
  }).filter(n => n !== undefined));
}

/**
 * For the Sub Attack Graph the node with sequence number 1 or the min date is the first relative node
 * @param nodes
 */
export function getFirstRelativeNodeTime(nodes) {
  let relativeTime = nodes.filter(node => "x_sequence_number" in node.data)
    .find(n => n.data.x_sequence_number === 1)

  if (relativeTime !== undefined) {
    return Date.parse(relativeTime.created);
  } else {
    return getMinNodeDate(nodes);
  }
}

/**
 * Get the maximum Date from a list of STIX Nodes
 * @param nodes
 * @return {Date}
 */
export function getMaxNodeDate(nodes) {
  return new Date(Math.max.apply(null, nodes.map(node => Date.parse(node.data.created))))
}

/**
 * Get the minimum Date from a list of STIX Nodes
 * @param nodes
 * @return {Date}
 */
export function getMinNodeDate(nodes) {
  return new Date(Math.min.apply(null, nodes.map(node => Date.parse(node.data.created))))
}

/**
 * The sub graph is split into 5 layers. Layer 1-4 are the Diamond Event Categories. The fifth layer is a floating
 * layer where STIX Cyber observable objects are displayed over all layers.
 *
 *              --|---------------------------------------------------------------------------------------------|
 *                |                                                                                             |
 *                |                                                                                             |
 *                |                                                                                             |
 * Adversary------|---------------------------------------------------------------------------------------------|
 *                |                                                                                             |
 *                |                                                                                             |
 *                |                                                                                             |
 * Capability-----|---------------------------------------------------------------------------------------------|
 *                |                                                                                             |
 *                |                                                                                             |
 *                |                                                                                             |
 * Infrastructure-|---------------------------------------------------------------------------------------------|
 *                |                                                                                             |
 *                |                                                                                             |
 *                |                                                                                             |
 * Victim---------|---------------------------------------------------------------------------------------------|
 *                |                                                                                             |
 *                |                                                                                             |
 *                |                                                                                             |
 *              --|---------------------------------------------------------------------------------------------|
 *
 * @param node
 */
export function getDiamondModelCategoryLayer(node) {
  // Layers
  const ADVERSARY = 0;
  const CAPABILITY = 1;
  const INFRASTRUCTURE = 2;
  const VICTIM = 3;
  const OVERLAY = 4;

  switch (node.data.type) {
    case THREAT_ACTOR_TYPE:
    case INTRUSION_SET_TYPE:
    case CAMPAIGN_TYPE:
      return ADVERSARY;
    case VULNERABILITY_TYPE:
    case TOOL_TYPE:
    case ATTACK_PATTERN_TYPE:
    case MALWARE_TYPE:
    case MALWARE_ANALYSIS_TYPE:
      return CAPABILITY;
    case INFRASTRUCTURE_TYPE:
      return INFRASTRUCTURE;
    case OBSERVED_DATA_TYPE:
    case IDENTITY_TYPE:
    case COURSE_OF_ACTION_TYPE:
    case INCIDENT_TYPE:
      return VICTIM;
    default:
      return OVERLAY;
  }
}

/**
 * Get the Node label which should be displayed in the Graph
 * @param node
 */
export function getNodeLabel(node) {
  switch (node.data.type) {
    case ATTACK_PATTERN_TYPE:
      return node.data.name + " - " + getTTP(node);
    case CAMPAIGN_TYPE:
    case IDENTITY_TYPE:
    case INDICATOR_TYPE:
    case INFRASTRUCTURE_TYPE:
    case INTRUSION_SET_TYPE:
    case LOCATION_TYPE:
    case MALWARE_TYPE:
    case THREAT_ACTOR_TYPE:
    case TOOL_TYPE:
    case VULNERABILITY_TYPE:
      return node.data.name;

  }
}


/**
 * Create the node view depending on the STIX object
 * @param data: This is a Node (STIX) object
 * @param titleId: The id of the title HTML element
 * @param contentId: The id of the content HTML element
 * @param typeId: The id of the type HTML element
 */
export function createView(data, titleId, contentId, typeId) {
  switch (data.type) {
    case ATTACK_PATTERN_TYPE:
      getAttackPatternView(titleId, contentId, typeId, data);
      break;
    case CAMPAIGN_TYPE:
      getCampaignView(titleId, contentId, typeId, data);
      break;
    case COURSE_OF_ACTION_TYPE:
      getCourseOfActionView(titleId, contentId, typeId, data);
      break;
    case IDENTITY_TYPE:
      getIdentityView(titleId, contentId, typeId, data);
      break;
    case INCIDENT_TYPE:
      getIncidentView(titleId, contentId, typeId, data);
      break;
    case INDICATOR_TYPE:
      getIndicatorView(titleId, contentId, typeId, data);
      break;
    case INFRASTRUCTURE_TYPE:
      getInfrastructureView(titleId, contentId, typeId, data);
      break;
    case INTRUSION_SET_TYPE:
      getIntrusionSetView(titleId, contentId, typeId, data);
      break;
    case LOCATION_TYPE:
      getLocationView(titleId, contentId, typeId, data);
      break;
    case MALWARE_TYPE:
      getMalwareView(titleId, contentId, typeId, data);
      break;
    case MALWARE_ANALYSIS_TYPE:
      getMalwareAnalysisView(titleId, contentId, typeId, data);
      break;
    case NOTE_TYPE:
      getNoteView(titleId, contentId, typeId, data);
      break;
    case OBSERVED_DATA_TYPE:
      getObservedDataView(titleId, contentId, typeId, data);
      break;
    case THREAT_ACTOR_TYPE:
      getThreatActorView(titleId, contentId, typeId, data);
      break;
    case OPINION_TYPE:
      getOpinionView(titleId, contentId, typeId, data);
      break;
    case REPORT_TYPE:
      getReportView(titleId, contentId, typeId, data);
      break;
    case TOOL_TYPE:
      getToolView(titleId, contentId, typeId, data);
      break;
    case VULNERABILITY_TYPE:
      getVulnerabilityView(titleId, contentId, typeId, data);
      break;
    case IPV4_TYPE:
      getIPvView(IPV4_TYPE, titleId, contentId, typeId, data);
      break;
    case IPV6_TYPE:
      getIPvView(IPV6_TYPE, titleId, contentId, typeId, data);
      break;
    case DOMAIN_TYPE:
      getDomainView(titleId, contentId, typeId, data);
      break;
    case URL_TYPE:
      getUrlView(titleId, contentId, typeId, data);
      break;
    case FILE_TYPE:
      getFileView(titleId, contentId, typeId, data);
      break;
    case DIRECTORY_TYPE:
      getDirectoryView(titleId, contentId, typeId, data);
      break;
    case PROCESS_TYPE:
      getProcessView(titleId, contentId, typeId, data);
      break;
    default:
      getCustomSTIXView(contentId, typeId, data);
      break;
  }
}
