import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { PolicyComponent } from './policy/policy.component';
import { HomeComponent } from './home/home.component';
import { WalletDialogComponent } from './wallet-dialog/wallet-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PurchaseDialogComponent } from './purchase-dialog/purchase-dialog.component';
import { BalanceComponent } from './balance/balance.component';
import { PolicyListComponent } from './policy-list/policy-list.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    PolicyComponent,
    HomeComponent,
    WalletDialogComponent,
    PurchaseDialogComponent,
    BalanceComponent,
    PolicyListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
