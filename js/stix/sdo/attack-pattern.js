"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttackPatternView = exports.ATTACK_PATTERN_TYPE = void 0;
var basic_1 = require("../basic");
exports.ATTACK_PATTERN_TYPE = "attack-pattern";
function getAttackPatternView(titleId, contentId, typeId, attackPatternSDO) {
    document.getElementById(titleId).innerHTML += attackPatternSDO.name;
    document.getElementById(typeId).innerHTML += "Attack-Pattern";
    var el = document.getElementById(contentId);
    var attackPatternDIV = document.createElement("div");
    attackPatternDIV.id = "attack-pattern";
    if (attackPatternSDO === null || attackPatternSDO === void 0 ? void 0 : attackPatternSDO.aliases)
        basic_1.addNodeViewTitleAndTextList(attackPatternDIV, "Aliases:", attackPatternSDO.aliases);
    if (attackPatternSDO === null || attackPatternSDO === void 0 ? void 0 : attackPatternSDO.description)
        basic_1.addNodeViewTitleAndText(attackPatternDIV, "Description:", attackPatternSDO.description);
    if (attackPatternSDO === null || attackPatternSDO === void 0 ? void 0 : attackPatternSDO.kill_chain_phases)
        basic_1.addKillChainPhases(attackPatternDIV, attackPatternSDO.kill_chain_phases);
    el.appendChild(attackPatternDIV);
    basic_1.customFieldView("attack-pattern", attackPatternSDO);
    if (attackPatternSDO === null || attackPatternSDO === void 0 ? void 0 : attackPatternSDO.external_references) {
        basic_1.externalReferencesView("attack-pattern", attackPatternSDO.external_references);
    }
}
exports.getAttackPatternView = getAttackPatternView;
