import { UserPolicyClaim } from './user-policy-claim';
import { Wallet } from './wallet';

export class User {
  id: number | any;
  firtName: string | any;
  lastName: string | any;
  userName: string | any;
  emailId: string | any;
  password: string | any;
  wallet: Wallet | any;
  claims: Array<UserPolicyClaim> | any;
}
