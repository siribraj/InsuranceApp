import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Policy } from '../model/policy';
import { PolicyPurchaseRequest } from '../model/policy-purchase-request';
import { PurchaseResponse } from '../model/purchase-response';
import { PolicyService } from '../service/policy.service';

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css'],
})
export class PurchaseDialogComponent implements OnInit {
  constructor(
    private policyService: PolicyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}
  policy: Policy = new Policy();
  policyRes: PurchaseResponse = new PurchaseResponse();
  policyReq: PolicyPurchaseRequest = new PolicyPurchaseRequest();

  ngOnInit(): void {
    this.policyReq.userId = this.data.purchaseReq.userId;
    console.log(
      'wallet add request on init: ' + JSON.stringify(this.policyReq)
    );
  }

  // purchasePolicy(req: PolicyPurchaseRequest) {
  //   console.log('wallet add request: ' + JSON.stringify(this.policyReq));
  //   this.policyService.purchasePolicy(req).subscribe(
  //     (d) => {
  //       this.policyRes = d;
  //       alert('Policy Succesfully Purchased..');
  //       this.reloadComponent(true);
  //     },
  //     (error) => {
  //       alert('Error purchasing the policy' + error);
  //     }
  //   );
  // }

  purchasePolicy(req: PolicyPurchaseRequest) {
    this.policyService.purchasePolicy(req).subscribe(
      (data) => {
        this.data = data;
        console.log('data after purchasing policy: ' + this.data);
        if(data!==null)
        { 
          alert('Policy Purchased');
          this.reloadComponent(true);
        }
        else{
          alert('Wallet Amount insufficient. Please add minimum amount of your respective policy premium');
        }
      },
      (error) => {
        alert('Error purchasing policy' + error);
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
