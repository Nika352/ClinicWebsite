import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public accountService: AccountService){
    
  }

  passwordForm = new FormGroup({
    password: new FormControl(this.data.oldPassword, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')])
  });

  get Password(): FormControl {
    return this.passwordForm.get("password") as FormControl;
  }

  onSubmit(){
    if(this.passwordForm.valid){
      const passValue  = this.passwordForm.get('password')?.value;
      const email = this.data.email;
      
      this.accountService.changePassword(email, passValue).subscribe(
        (response) => {
          console.log('Response:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error:', error);
          // Handle the error appropriately
        }
      );   
    }
    }
}
