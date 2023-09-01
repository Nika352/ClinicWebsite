import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-pid-dialog',
  templateUrl: './pid-dialog.component.html',
  styleUrls: ['./pid-dialog.component.css']
})
export class PidDialogComponent {
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public accountService : AccountService){

  }

  pidForm = new FormGroup({
    PID: new FormControl(this.data.oldPid, [Validators.required, Validators.min(9999999999), Validators.max(99999999999)])
  });

  get Pid(): FormControl {
    return this.pidForm.get("PID") as FormControl;
  }

  onSubmit(){
    
    if(this.pidForm.valid){
      const pidValue  = this.pidForm.get('PID')?.value.toString();
      const email = this.data.email;
      
      this.accountService.changePid(email, pidValue).subscribe(
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
