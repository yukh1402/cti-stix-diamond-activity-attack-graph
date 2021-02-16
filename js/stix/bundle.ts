import {BasicSTIX} from './basic';
import {AttackPatternSDO} from "./sdo/attack-pattern";
import {GroupingSDO} from "./sdo/grouping";
import {IdentitySDO} from "./sdo/identity";
import {MalwareSDO} from "./sdo/malware";
import {ObservedSDO} from "./sdo/observed-sdo";
import {ThreatActorSDO} from "./sdo/threat-actor";
import {ToolSDO} from "./sdo/tool";
import {VulnerabilitySDO} from "./sdo/vulnerability";
import {RelationshipSRO} from "./sro/relationship";
import {SightingSRO} from "./sro/sighting";
import {DirectorySCO} from "./sco/directory";
import {FileSCO} from "./sco/file";
import {IPv4SCO, IPv6SCO} from "./sco/ipv-sco";
import {NetworkTrafficSCO} from "./sco/network-traffic";
import {ProcessSCO} from "./sco/process";
import {ScheduledTaskSCO} from "./sco/scheduled-task";
import {SoftwareSCO} from "./sco/software";
import {TriggerSCO} from "./sco/trigger";
import {UserAccountSCO} from "./sco/user-account";

export interface Bundle extends BasicSTIX {
  objects: (
    AttackPatternSDO
    | GroupingSDO
    | IdentitySDO
    | MalwareSDO
    | ObservedSDO
    | ThreatActorSDO
    | ToolSDO
    | VulnerabilitySDO
    | RelationshipSRO
    | SightingSRO
    | DirectorySCO
    | FileSCO
    | IPv4SCO
    | IPv6SCO
    | NetworkTrafficSCO
    | ProcessSCO
    | ScheduledTaskSCO
    | SoftwareSCO
    | TriggerSCO
    | UserAccountSCO) [];
}
