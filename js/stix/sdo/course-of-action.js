import {addNodeViewTitleAndText, customFieldView, externalReferencesView} from "../basic";

export const COURSE_OF_ACTION_TYPE = "course-of-action";

export function getCourseOfActionView(titleId, contentId, typeId, courseOfActionSDO) {
  document.getElementById(titleId).innerHTML += courseOfActionSDO.name;
  document.getElementById(typeId).innerHTML += "Course-Of-Action";

  let el = document.getElementById(contentId);
  const courseOfActionDIV = document.createElement("div");
  courseOfActionDIV.id = "course-of-action";

  if (courseOfActionSDO?.description) addNodeViewTitleAndText(courseOfActionDIV, "Description:",
    courseOfActionSDO.description);
  el.appendChild(courseOfActionDIV);

  customFieldView(courseOfActionDIV.id, courseOfActionSDO);

  if (courseOfActionSDO?.external_references) {
    externalReferencesView(courseOfActionDIV.id, courseOfActionSDO.external_references);
  }
}
