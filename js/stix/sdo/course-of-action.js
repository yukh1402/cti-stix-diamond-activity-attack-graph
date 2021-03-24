"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseOfActionView = exports.COURSE_OF_ACTION_TYPE = void 0;
var basic_1 = require("../basic");
exports.COURSE_OF_ACTION_TYPE = "course-of-action";
function getCourseOfActionView(titleId, contentId, typeId, courseOfActionSDO) {
    document.getElementById(titleId).innerHTML += courseOfActionSDO.name;
    document.getElementById(typeId).innerHTML += "Course-Of-Action";
    var el = document.getElementById(contentId);
    var courseOfActionDIV = document.createElement("div");
    courseOfActionDIV.id = "course-of-action";
    if (courseOfActionSDO === null || courseOfActionSDO === void 0 ? void 0 : courseOfActionSDO.description)
        basic_1.addNodeViewTitleAndText(courseOfActionDIV, "Description:", courseOfActionSDO.description);
    el.appendChild(courseOfActionDIV);
    basic_1.customFieldView(courseOfActionDIV.id, courseOfActionSDO);
    if (courseOfActionSDO === null || courseOfActionSDO === void 0 ? void 0 : courseOfActionSDO.external_references) {
        basic_1.externalReferencesView(courseOfActionDIV.id, courseOfActionSDO.external_references);
    }
}
exports.getCourseOfActionView = getCourseOfActionView;
