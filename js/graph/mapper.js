import {ATTACK_PATTERN_TYPE} from "../stix/sdo/attack-pattern";
import {Graph, Link, Node} from "./node";
import {GROUPING_TYPE} from "../stix/sdo/grouping";
import {RELATIONSHIP_TYPE} from "../stix/sro/relationship";

export const MITRE_ATTACK_CATEGORIES = [
  "Reconnaissance", "Resource Development", "Initial Access", "Execution", "Persistence", "Privilege Escalation",
  "Defense Evasion", "Credential Access", "Discovery", "Lateral Movement", "Collection", "Command and Control",
  "Exfiltration", "Impact"]

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
  let words = tactic.split(" ");
  words.forEach(word => {
    if (word.toLowerCase() === "and") {
      string += "and";
    } else {
      string += word.charAt(0).toUpperCase() + word.slice(1);
    }
  })
  return string;
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
  bundle.objects.forEach(obj => {
    if (obj.type === GROUPING_TYPE) {
      let node = new Node(obj.id, obj, obj.type, buildSubGraphForGrouping(obj, bundle))
      nodes.push(node);
    } else if (obj.type === RELATIONSHIP_TYPE) {
      if (obj.source_ref.includes(GROUPING_TYPE) && obj.target_ref.includes(GROUPING_TYPE)) {
        groupingLinks.push(
          new Link(
            nodes.findIndex(no => no.id === obj.source_ref),
            nodes.findIndex(no => no.id === obj.target_ref), obj, obj.relationship_type));
      }
    }
  })
  return new Graph(nodes, groupingLinks);
}

function buildSubGraphForGrouping(grouping, bundle) {
  let childNodes = [];
  let childLinks = [];
  grouping.object_refs.forEach(ref => {
    let foundObj = bundle.objects.find(obj => obj.id === ref);

    // Grouping Objects are not allowed in the Subgraph
    if (!foundObj.id.includes(GROUPING_TYPE)) {
      if (!foundObj.id.includes(RELATIONSHIP_TYPE)) {
        childNodes.push(new Node(foundObj.id, foundObj, foundObj.type));
      } else {
        // Dont push relationship obj if target or source ref is a grouping object or relationship obj already exists in childlinks
        if (!foundObj.source_ref.includes(GROUPING_TYPE) && !foundObj.target_ref.includes(GROUPING_TYPE)
          && !childLinks.find(link => link.id === foundObj.id))
          childLinks.push(
            new Link(
              childNodes.findIndex(no => no.id === foundObj.source_ref),
              childNodes.findIndex(no => no.id === foundObj.target_ref), foundObj, foundObj.relationship_type));
      }
      // Get all relationship objects for foundObj
      bundle.objects.forEach(obj => {
        if (obj.id.includes(RELATIONSHIP_TYPE)) {
          if (!childLinks.find(rel => rel.id === obj.id)
            && (obj.source_ref === foundObj.id || obj.target_ref === foundObj.id)) {
            childLinks.push(obj);
          }
        }
      })
    }
  })
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
