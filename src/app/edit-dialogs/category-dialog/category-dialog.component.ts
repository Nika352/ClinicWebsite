import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/account.service';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public accountService : AccountService){

  }

  categoryForm = new FormGroup({
    category: new FormControl(this.data.oldCategory, [Validators.required])
  });

  get Category(): FormControl {
    return this.categoryForm.get("category") as FormControl;
  }

  onSubmit(){
    if(this.categoryForm.valid){
      const categoryValue  = this.categoryForm.get('category')?.value;
      const email = this.data.email;
      
      this.accountService.changeCategory(email, categoryValue).subscribe(
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
