import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.css']
})
export class EmailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public accountService: AccountService){
    
  }

  emailForm = new FormGroup({
    email: new FormControl(this.data.oldEmail, [Validators.required, Validators.email])
  });

  get Email(): FormControl {
    return this.emailForm.get("email") as FormControl;
  }

  onSubmit(){
    if(this.emailForm.valid){
      const newEmail  = this.emailForm.get('email')?.value;
      const email = this.data.oldEmail;
      
      this.accountService.changeEmail(email, newEmail).subscribe(
        (response) => {
          console.log('Response:', response);
           window.location.href = `http://localhost:4200/admin?doctorEmail=${encodeURIComponent(newEmail)}`;
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error appropriately
        }
      );   
    }
    }
}
