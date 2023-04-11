import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pid-dialog',
  templateUrl: './pid-dialog.component.html',
  styleUrls: ['./pid-dialog.component.css']
})
export class PidDialogComponent {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){

  }

  pidForm = new FormGroup({
    PID: new FormControl(this.data.oldPid, [Validators.required, Validators.min(9999999999), Validators.max(99999999999)])
  });

  get Pid(): FormControl {
    return this.pidForm.get("PID") as FormControl;
  }

  onSubmit(){
    if(this.pidForm.valid){
      window.location.reload();
    }
    }
}
