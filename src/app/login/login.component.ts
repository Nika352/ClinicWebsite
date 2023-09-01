import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { AccountService } from '../account.service';
import { Account } from '../account';
import { FormsModule } from '@angular/forms';
import { VerificationComponent } from '../verification/verification.component';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private accountService : AccountService, public dialogRef:MatDialogRef<LoginComponent>, public emailService: EmailService) {}

  email : string = '';
  password : string = '';
  error :boolean = false;
  message = "*პაროლი ან მეილი არასწორია";

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
        this.message = "*პაროლი ან მეილი არასწორია";
      }
    );
}

openDialog(){
  if(this.email != "" && this.email.indexOf('@')!=-1){
    this.emailService.addTwoStepCode(this.email).subscribe();
    this.dialog.open(VerificationComponent,  {
      height: '450px',
      width: '600px',
      data: { email: this.email }
    });
  } else {
    this.error = true;
    this.message = "*შეიყვანეთ თქვენი მეილი"
  }
 
 }

  closeDialog(){
      this.dialogRef.close();
  }


}
