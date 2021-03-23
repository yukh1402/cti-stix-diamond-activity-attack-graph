import {addNodeViewText, BasicSDOSRO, customFieldView, externalReferencesView} from "../basic";

export const COURSE_OF_ACTION_TYPE = "course-of-action";

export interface CourseOfActionSDO extends BasicSDOSRO {
  name: string;
  description?: string;
  action?: any; // Reserved for future implementations
}

export function getCourseOfActionView(titleId: string, contentId: string, typeId: string,
                                      courseOfActionSDO: CourseOfActionSDO) {
  document.getElementById(titleId).innerHTML += courseOfActionSDO.name;
  document.getElementById(typeId).innerHTML += "Course-Of-Action";

  let el = document.getElementById(contentId);
  const courseOfActionDIV = document.createElement("div");
  courseOfActionDIV.id = "course-of-action";

  if (courseOfActionSDO?.description) addNodeViewText(courseOfActionDIV, courseOfActionSDO.description);
  el.appendChild(courseOfActionDIV);

  customFieldView(courseOfActionDIV.id, courseOfActionSDO);

  if (courseOfActionSDO?.external_references) {
    externalReferencesView(courseOfActionDIV.id, courseOfActionSDO.external_references);
  }
}
