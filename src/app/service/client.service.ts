import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationRequest } from '../model/registration-request';
import { RegistrationResponse } from '../model/registration-response';
import { LoginRequest } from '../model/login-request';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, ) {
  }

  private registerUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/register`;
  private loginUrl: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/login`;
  private getClientById: string = `http://ec2-34-217-101-33.us-west-2.compute.amazonaws.com:8080/userInfo`;

  addClient(request: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(this.registerUrl, request);
  }

  login(loginReq: LoginRequest): Observable<User> {
    return this.http.post<User>(this.loginUrl, loginReq);
  }

  findUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.getClientById}/${userId}`);
  }

  private isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedInpub$ = this.isLoggedIn$.asObservable();
}
