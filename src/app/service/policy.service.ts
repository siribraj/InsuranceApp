import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../model/policy';
import { PolicyPurchaseRequest } from '../model/policy-purchase-request';
import { PurchaseResponse } from '../model/purchase-response';
import { UserPolicyClaim } from '../model/user-policy-claim';
import { UserPolicyClaimRequest } from '../model/user-policy-claim-request';
import { Wallet } from '../model/wallet';
import { WalletResponse } from '../model/wallet-response';
import { WalletTopupRequest } from '../model/wallet-topup-request';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  constructor(private http: HttpClient) {}

  private addWalletUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/add-wallet-balance`;
  private getPolicyUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/policyInfo`;
  private purchasePolicyUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/purchase-policy`;
  private claimPolicyUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/process-claim`;
  private findPolicyUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/purchased-policy`;
  private findWalletUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/wallet-info`;
  private getAllPolicyUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/all-policies`;

  addWalletBalance(request: WalletTopupRequest): Observable<WalletResponse> {
    return this.http.post<WalletResponse>(this.addWalletUrl, request);
  }

  getPolicyById(userId: number): Observable<Array<UserPolicyClaim>> {
    return this.http.get<Array<UserPolicyClaim>>(
      `${this.getPolicyUrl}/${userId}`
    );
  }

  getPolicyByName(policyName: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.findPolicyUrl}/${policyName}`);
  }

  purchasePolicy(req: PolicyPurchaseRequest): Observable<PurchaseResponse> {
    return this.http.post<PurchaseResponse>(this.purchasePolicyUrl, req);
  }

  claimPolicy(req: UserPolicyClaimRequest): Observable<WalletResponse> {
    return this.http.put<WalletResponse>(this.claimPolicyUrl, req);
  }

  findWalletByUserId(userId: number): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.findWalletUrl}/${userId}`);
  }

  getAllPolicy():Observable<Array<Policy>>{
    return this.http.get<Array<Policy>>(this.getAllPolicyUrl);
  }
}
