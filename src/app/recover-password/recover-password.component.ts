import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { email: string }, public accountService: AccountService) { }

  passwordForm = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
  });

  get Password(): FormControl  {
    return this.passwordForm.get("password") as FormControl;
  }

 confirmPassword :string = '';

  onSubmit() {
    if (this.passwordForm.valid) {
      const passValue = this.passwordForm.get('password')?.value;
     
      const email = this.data.email;
      if (passValue === this.confirmPassword) {
        console.log(true);
        this.accountService.changePassword(email, passValue!).subscribe(
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
}
