import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Wallet } from '../model/wallet';
import { WalletTopupRequest } from '../model/wallet-topup-request';
import { PolicyService } from '../service/policy.service';

@Component({
  selector: 'app-wallet-dialog',
  templateUrl: './wallet-dialog.component.html',
  styleUrls: ['./wallet-dialog.component.css']
})
export class WalletDialogComponent implements OnInit {

  constructor(private policyService: PolicyService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }
  wallet: Wallet = new Wallet();
  walletReq: WalletTopupRequest = new WalletTopupRequest();

  ngOnInit(): void {
    this.walletReq.userId = this.data.walletReq.userId;
    console.log("wallet add request on init: "+ JSON.stringify(this.walletReq))
  }

  addWallet(req: WalletTopupRequest) {
    console.log("wallet add request: "+ JSON.stringify(this.walletReq))
    this.policyService.addWalletBalance(req).subscribe(
      (d) => {
        this.wallet.amount = d.amount;               
        alert('Amount successfully added to wallet.');
        this.reloadComponent(true);
      },
      (error) => {
        alert('error adding amount to wallet' + error);
      }
    );
  }

  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    const url=self ? this.router.url :urlToNavigateTo;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([`/${url}`]).then(()=>{
        console.log(`${this.router.url}`)
      })
    })
  }
 
}
