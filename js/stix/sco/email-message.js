import {customFieldView} from "../basic.js";

export const EMAIL_MESSAGE_TYPE = "email-message";

export function getEmailMessageView(titleId, contentId, typeId, emailMessageSCO) {
  document.getElementById(titleId).innerHTML += emailMessageSCO.subject;
  document.getElementById(typeId).innerHTML += "Email Message";

  let el = document.getElementById(contentId);
  const emailMessageDIV = document.createElement("div");
  emailMessageDIV.id = EMAIL_MESSAGE_TYPE;

  el.appendChild(emailMessageDIV);
  customFieldView(emailMessageDIV.id, emailMessageSCO, true);
}
