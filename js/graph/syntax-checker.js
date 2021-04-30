import {GROUPING_TYPE} from "../stix/sdo/grouping";
import {ATTACK_PATTERN_TYPE} from "../stix/sdo/attack-pattern";
import {getTactic, getTTP} from "./mapper";
import {Node} from "./node";

/**
 * A warning class that indicates a bad practice
 */
export class Warning extends Error {
  constructor(message) {
    super(message);
    super.name = "Warning";
  }
}

export function checkSyntax(bundle) {
  let groupingSDOs = bundle.objects.filter(obj => obj.type === GROUPING_TYPE);
  let groupingWithAttackPattern = groupingSDOs.filter(grouping => grouping.object_refs
    .find(ref => ref.includes(ATTACK_PATTERN_TYPE)))

  checkIfBundleProvided(bundle);
  checkGroupingAttackPatternExists(groupingSDOs, groupingWithAttackPattern);
  checkAttackPatternJSON(bundle, groupingWithAttackPattern);
}

/**
 * Check if bundle schema is provided
 * @param bundle
 */
function checkIfBundleProvided(bundle) {
  let keys = Object.keys(bundle);
  if (keys.includes("id") === false || keys.includes("type") === false || keys.includes("objects") === false) {
    throw new Error("STIX Bundle schema is not provided. Please refer to the STIX specification for further " +
      "information.");
  }
  if (bundle.type !== "bundle") {
    throw new Error("The STIX Bundle type is not correct. Type needs to be 'bundle'.");
  }
}

/**
 * Check if Grouping SDOs exist and minimum one Attack Pattern SDO exists inside a Grouping SDO in the complete Bundle.
 * If all Grouping SDOs exists without an Attack Pattern SDO then the Bundle can't be processed.
 * If one Attack Pattern SDO only exists in a single Grouping SDO then the Bundle can be processed with a warning
 * message.
 * @param groupingSDOs: All existing Grouping SDOs
 * @param groupingWithAttackPattern: All Grouping SDOs that contain an Attack Pattern SDO
 */
function checkGroupingAttackPatternExists(groupingSDOs, groupingWithAttackPattern) {
  if (groupingSDOs.length === 0) {
    throw new Error("Minimum one Grouping SDO needs to be provided inside the Bundle.")
  } else if (groupingWithAttackPattern.length === 0) {
    throw new Error("All Grouping SDOs inside the Bundle do not include an Attack Pattern SDO. The Grouping SDOs " +
      "needs one Attack Pattern SDO for visualization.")
  } else if (groupingSDOs.length > groupingWithAttackPattern.length) {
    let groupingSDOsWithoutAttackPattern = groupingSDOs.filter(grouping =>
      !grouping.object_refs.find(ref => ref.includes(ATTACK_PATTERN_TYPE))).map(g => g.id);
    let ids = groupingSDOsWithoutAttackPattern.join(", ");
    throw new Warning("All Grouping SDOs should include one Attack Pattern SDO. Grouping SDOs with " +
      "ID: " + ids + " do not include an Attack Pattern SDO reference.")
  }
}

/**
 * Check if the Attack Pattern JSON Schema is provided as required.
 * @param bundle: The STIX bundle that should be processed
 * @param groupingWithAttackPattern: All Grouping SDOs with an Attack Pattern SDO
 */
function checkAttackPatternJSON(bundle, groupingWithAttackPattern) {
  groupingWithAttackPattern.forEach(grouping => {
    let attackPatternSDO = bundle.objects.find(obj => obj.id === grouping.object_refs
      .find(ref => ref.includes(ATTACK_PATTERN_TYPE)));
    let attackPatternNode = new Node(undefined, attackPatternSDO);
    try {
      getTactic(attackPatternNode);
    } catch {
      throw new Error("Could not read the tactic name for Attack Pattern SDO " + attackPatternSDO.id);
    }
    try {
      getTTP(attackPatternNode);
    } catch {
      throw new Error("Could not read the TTP number for Attack Pattern SDO " + attackPatternSDO.id);
    }
  })
}
