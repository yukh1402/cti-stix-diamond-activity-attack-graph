import {BasicSTIX, STIXField} from '../basic';

export const USER_ACCOUNT_SCO_FIELDS: STIXField [] = [
  {key: 'display_name', viewValue: 'Name', type: 'user-account', typeName: 'User Account SCO'},
  {key: 'user_id', viewValue: 'ID', type: 'user-account', typeName: 'User Account SCO'},
  {key: 'x_account_type', viewValue: 'Account type', type: 'user-account', typeName: 'User Account SCO'},
  {key: 'account_login', viewValue: 'Account login', type: 'user-account', typeName: 'User Account SCO'},
  {key: 'x_account_domain_name', viewValue: 'Account domain name', type: 'user-account', typeName: 'User Account SCO'},
  {key: 'x_user_sid', viewValue: 'User SID', type: 'user-account', typeName: 'User Account SCO'}
];

export interface UserAccountSCO extends BasicSTIX {
  user_id?: string;
  display_name?: string;
  x_account_type?: string;
  account_login?: string;
  x_account_domain_name?: string;
  x_user_sid?: string;
}
