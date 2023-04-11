import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, public dialog: MatDialog, private accountService: AccountService) { 

  }

  ngOnInit(): void {
    this.logAccount();
    if(this.currentAccount?.img){
      this.hasImage = true;
    }
  }
 
  currentAccount: Account | null = null;

  

  hasImage : boolean = false;

  logAccount(){
    const accountString = localStorage.getItem('currentAccount');
    if (accountString) {
      this.currentAccount = JSON.parse(accountString) as Account;
      
    } else {
      this.currentAccount = null;
    }
  }




   openDialog(){
    this.dialog.open(LoginComponent,  {
      height: '450px',
      width: '600px',
    });
   }

   isAdmin(){
    return this.currentAccount!==null && this.currentAccount.accountType==="Administrator"
   }

}

