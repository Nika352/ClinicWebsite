import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { AccountService } from '../account.service';
import { Account } from '../account';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private accountService : AccountService, public dialogRef:MatDialogRef<LoginComponent>) {}

  email : string = '';
  password : string = '';
  error :boolean = false;

  login(){
    this.accountService.login(this.email, this.password).subscribe((currentAccount: Account | null) => {
       
        
        this.error = false;
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        this.closeDialog();
        window.location.reload();
      },
      (error: any) => {
        // Handle error here
        this.error = true;
      }
    );
}

  closeDialog(){
      this.dialogRef.close();
  }


}
