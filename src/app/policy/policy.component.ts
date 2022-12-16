import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BalanceComponent } from '../balance/balance.component';
import { LoginRequest } from '../model/login-request';
import { Policy } from '../model/policy';
import { PolicyPurchaseRequest } from '../model/policy-purchase-request';
import { RegistrationRequest } from '../model/registration-request';
import { RegistrationResponse } from '../model/registration-response';
import { User } from '../model/user';
import { UserPolicyClaim } from '../model/user-policy-claim';
import { UserPolicyClaimRequest } from '../model/user-policy-claim-request';
import { Wallet } from '../model/wallet';
import { WalletResponse } from '../model/wallet-response';
import { WalletTopupRequest } from '../model/wallet-topup-request';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { PurchaseDialogComponent } from '../purchase-dialog/purchase-dialog.component';
import { ClientService } from '../service/client.service';
import { PolicyService } from '../service/policy.service';
import { WalletDialogComponent } from '../wallet-dialog/wallet-dialog.component';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent implements OnInit {
  constructor(
    private policyService: PolicyService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private r: Router
  ) {}

  ngOnInit(): void {
    console.log("authToken"+localStorage.getItem('authToken'))
    this.user.id = this.route.snapshot.paramMap.get('userId');
    this.findUserById();
    this.findWalletByUserId(this.user.id);
    this.getPolicyById(this.user.id);    
  }

  user: User = new User();
  registerReq: RegistrationRequest = new RegistrationRequest();
  registrationRes: RegistrationResponse = new RegistrationResponse();
  loginReq: LoginRequest = new LoginRequest();
  isLogin: boolean = false;
  walletReq: WalletTopupRequest = new WalletTopupRequest();
  walletRes: WalletResponse = new WalletResponse();
  wallet: Wallet = new Wallet();
  userPolicyClaim: UserPolicyClaim = new UserPolicyClaim();
  claimReq: UserPolicyClaimRequest = new UserPolicyClaimRequest();
  policyList: Array<UserPolicyClaim> = [];
  policy: Policy = new Policy();
  register: boolean = false;
  loginFlag: boolean = true;
  data: any = {};
  walletFlag: boolean = false;
  showTable:boolean = true;
  walletNull: boolean = false;
  policyNull : boolean = false;

  openDialog() {
    this.findWalletByUserId(this.user.id);
    console.log("opening dialog- wallet balance. Balance amount: "+ this.wallet.amount)
    this.dialog.open(BalanceComponent, {
      data: {
        walletBalance: this.wallet.amount
      },
    });
  }

  findUserById() {
    console.log('finding user');
    this.clientService.findUserById(this.user.id).subscribe((data) => {
      console.log('finding user by id : ' + JSON.stringify(data));
      this.user.firtName = data.firtName;
      this.user.wallet = data.wallet;
      this.user.lastName = data.lastName;
    });
  }

  purchaseNewPolicy(){
    this.openPurchaseDialog();
  }

  openPurchaseDialog() {
    this.dialog.open(PurchaseDialogComponent,{data:{purchaseReq:{userId:this.user.id}}});    
  }

  showVal() {    
    this.openWalletDialog(); 
    this.walletFlag= true;
  }
  
  openWalletDialog() {
    this.dialog.open(WalletDialogComponent,{data:{walletReq:{userId:this.user.id}}}); 
    this.walletNull=false;   
  }

  openPolicyDialog(){
    this.dialog.open(PolicyListComponent)
  }

  getPolicyById(id: number) {
    this.policyService.getPolicyById(id).subscribe((data) => {
      console.log('policy list of user : ' + JSON.stringify(data));
      if (!Object.keys(data).length) {
        this.showTable = false;
        this.policyNull = true;
      }
      this.policyList = data;
      console.log(
        'policy list after copying data: ' + JSON.stringify(this.policyList)
      );
      this.clientService.findUserById(this.user.id);
    });
  }

  claim(policyName: string, purchaseDttm: Date) {
    this.policyService.getPolicyByName(policyName).subscribe((data) => {
      this.policy = data;
      this.claimReq.claimAmount = this.policy.policyCoverage;
      this.claimReq.policyName = policyName;
      this.claimReq.purchaseDttm = purchaseDttm;
      this.claimPolicy(this.claimReq);
    });
  }

  claimPolicy(req: UserPolicyClaimRequest) {
    this.policyService.claimPolicy(req).subscribe(
      (data) => {
        this.data = data;
        this.wallet.amount = data.amount;
        console.log('Claim details: ' + JSON.stringify(this.data));
        if (this.data.errorMessage == null) {
          alert('Claim amount successfully added to wallet');
          this.getPolicyById(this.user.id);
        } else {
          alert(
            'The Policy is already claimed. Please Purchase it again to avail the claim'
          );
        }
      },
      (error) => {
        alert('error adding claim amount to wallet' + error);
      }
    );
  }

  showWalletBalance() {
    this.findWalletByUserId(this.user.id);
    this.walletFlag = true;    
  }

  findWalletByUserId(userId: number) {
    this.policyService.findWalletByUserId(userId).subscribe((data) => {
      this.wallet = data;
      console.log('User Wallet: ' + JSON.stringify(this.wallet));
      if(data==null){
        console.log("null");
        this.walletNull = true;
      }
    });
  }
  logout(){
    localStorage.removeItem('authToken');
    this.r.navigate(['/home']);
  }
}
