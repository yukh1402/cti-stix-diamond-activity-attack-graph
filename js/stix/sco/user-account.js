import {addNodeViewTitleAndText, customFieldView} from "../basic.js";

export const USER_ACCOUNT_TYPE = "user-account";

export function getUserAccountView(titleId, contentId, typeId, userAccountSCO) {
  document.getElementById(titleId).innerHTML += userAccountSCO?.user_id ? userAccountSCO.user_id: "N/A";
  document.getElementById(typeId).innerHTML += "User-Account";

  let el = document.getElementById(contentId);
  const userAccountDIV = document.createElement("div");
  userAccountDIV.id = USER_ACCOUNT_TYPE;

  if (userAccountSCO?.credential) addNodeViewTitleAndText(userAccountDIV, "Credential:", userAccountSCO.credential);
  if (userAccountSCO?.account_login) addNodeViewTitleAndText(userAccountDIV, "Account login:",
    userAccountSCO.account_login);
  if (userAccountSCO?.account_type) addNodeViewTitleAndText(userAccountDIV, "Account type:",
    userAccountSCO.account_type);
  if (userAccountSCO?.display_name) addNodeViewTitleAndText(userAccountDIV, "Display name:",
    userAccountSCO.display_name);
  if (userAccountSCO?.is_service_account) addNodeViewTitleAndText(userAccountDIV, "Is service account:",
    userAccountSCO.is_service_account === true ? "Yes": "No");
  if (userAccountSCO?.is_privileged) addNodeViewTitleAndText(userAccountDIV, "Is privileged:",
    userAccountSCO.is_privileged === true ? "Yes": "No");
  if (userAccountSCO?.can_escalate_privs) addNodeViewTitleAndText(userAccountDIV, "Escalate privileges:",
    userAccountSCO.can_escalate_privs === true ? "Yes": "No");
  if (userAccountSCO?.is_disabled) addNodeViewTitleAndText(userAccountDIV, "Is disabled:",
    userAccountSCO.is_disabled === true ? "Yes": "No");
  if (userAccountSCO?.account_created) addNodeViewTitleAndText(userAccountDIV, "Account created:",
    new Date(userAccountSCO.account_created).toUTCString());
  if (userAccountSCO?.account_expires) addNodeViewTitleAndText(userAccountDIV, "Account expires:",
    new Date(userAccountSCO.account_expires).toUTCString());
  if (userAccountSCO?.credential_last_changed) addNodeViewTitleAndText(userAccountDIV, "Credential last changed:",
    new Date(userAccountSCO.credential_last_changed).toUTCString());
  if (userAccountSCO?.account_first_login) addNodeViewTitleAndText(userAccountDIV, "Account first login:",
    new Date(userAccountSCO.account_first_login).toUTCString());
  if (userAccountSCO?.account_last_login) addNodeViewTitleAndText(userAccountDIV, "Account last login:",
    new Date(userAccountSCO.account_last_login).toUTCString());

  el.appendChild(userAccountDIV);
  customFieldView(userAccountDIV.id, userAccountSCO);
}
