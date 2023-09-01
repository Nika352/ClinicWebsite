import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '../email.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  code : string = '';

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { email: string }, public emailService : EmailService) {

  }

  verify() {
    this.emailService.checkTwoStepCode(this.data.email, this.code).subscribe(
      correctCode => {
        if (correctCode === true) {
          // Case when the code is correct
          console.log('Code is correct');
          // You can perform additional actions here
          if(localStorage.getItem("currentAccount")){
            this.emailService.verify(this.data.email).subscribe();
            window.location.reload();
          } else{
            this.dialog.open(RecoverPasswordComponent,  {
              height: '450px',
              width: '600px',
              data: { email: this.data.email }
            });
          }
        
        } else {
          // Case when the code is incorrect
          console.log('Code is incorrect');
          // You can perform additional actions here
        }
      },
      error => {
        console.error('Error:', error);
        // Handle error cases if needed
      }
    );
  }
}
