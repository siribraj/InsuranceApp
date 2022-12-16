import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginRequest } from '../model/login-request';
import { RegistrationRequest } from '../model/registration-request';
import { RegistrationResponse } from '../model/registration-response';
import { User } from '../model/user';
import { Wallet } from '../model/wallet';
import { WalletResponse } from '../model/wallet-response';
import { WalletTopupRequest } from '../model/wallet-topup-request';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  isLoggedIn$: any;
  constructor(private clientService: ClientService, private route: Router) {}
  ngOnInit(): void {}

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$";
  passwordPattern = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$";
  submitted = false;
  user: User = new User();
  registerReq: RegistrationRequest = new RegistrationRequest();
  registrationRes: RegistrationResponse = new RegistrationResponse();
  loginReq: LoginRequest = new LoginRequest();
  isLogin: boolean = false;
  walletReq: WalletTopupRequest = new WalletTopupRequest();
  walletRes: WalletResponse = new WalletResponse();
  wallet: Wallet = new Wallet();
  register: boolean = false;
  loginFlag: boolean = true;
  data: any = {};

  onSubmit() { this.submitted = true; }
  showRegister() {
    this.register = true;
    this.loginFlag = false;
  }
  addClient(registerReq: RegistrationRequest) {
    this.clientService.addClient(registerReq).subscribe(
      (data) => {
        this.data = data;
        console.log(
          'Data after subscribing clientService.addClient: ' + this.data
        );
        alert('User successfully added');
      },
      (error) => {
        console.log('error adding user: ' + error);
      }
    );
    this.register = false;
    this.loginFlag = true;
  }
  login(loginReq: LoginRequest) {
    this.clientService.login(loginReq).subscribe(
      (data) => {
        console.log(data);
        if (data !== null) {
          this.data = data;
          this.user.firtName = data.firtName;
          this.user.id = data.id;
          this.user.wallet = data.wallet;
          this.user.claims = data.claims;
          this.user.userName = data.userName;
          alert('User successfully logged in!');
          localStorage.setItem('authToken', data.password);
          this.route.navigate(['/policy', data.id]);
        } else {
          alert('Error logging in. Please check the credentials');
          window.location.reload();
        }
      },
      (error) => {
        alert('Error logging in.' + error);
      }
    );
  }
}
