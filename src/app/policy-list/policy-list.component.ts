import { Component, OnInit } from '@angular/core';
import { Policy } from '../model/policy';
import { PolicyService } from '../service/policy.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  constructor(private service: PolicyService) { }
  policyList: Array<Policy>=[];
  ngOnInit(): void {
    this.getAllPolicies();
  }
  getAllPolicies(){
    this.service.getAllPolicy().subscribe((data)=>{
      console.log("List of all policies: "+ JSON.stringify(data));
      this.policyList=data;
    })
  }

}
