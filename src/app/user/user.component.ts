import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailService } from '../email.service';
import { VerificationComponent } from '../verification/verification.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../edit-dialogs/password-dialog/password-dialog.component';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  currentAccount: Account | null = null;

  message : string = "";

  constructor(public dialog : MatDialog, private accountService : AccountService, private emailService: EmailService){

  }

  isVerified: boolean = false;

  ngOnInit(){
    
    const accountString = localStorage.getItem('currentAccount');
   
    if(accountString){
      this.currentAccount = JSON.parse(accountString) as Account;
    }

    this.emailService.isVerified(this.currentAccount?.email!).subscribe(
      verified => {
        this.isVerified = verified; // Assign the value received from the service
      }
    );

    const currentAccountString = localStorage.getItem('currentAccount');
    const currentAccount: Account = currentAccountString ? JSON.parse(currentAccountString) : null;
    const img = currentAccount.img;
    if(img!= null && img.length>5){
      this.hasImage=true;
    }
    this.imageData = img;
  }

  logOut(){   
      this.hasImage = false;
      localStorage.clear();
      window.location.href = "";
  }

  hasImage : boolean = false;

  //USED FOR IMAGE UPLOAD (base64)
  imageData:any = '';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl: string | ArrayBuffer | null = e.target?.result ?? null;

      if (this.isImageFile(file)) {
       
        this.imageData = imageUrl;
        const storedAccount = localStorage.getItem('currentAccount');
        const currentAccount = storedAccount ? JSON.parse(storedAccount) : null;
        
        this.accountService.setImage(currentAccount.email, this.imageData).subscribe((updatedAccount: Account | null)=>{
         
          localStorage.setItem('currentAccount', JSON.stringify(updatedAccount));
          window.location.reload();
        });
      }
    };

    reader.readAsDataURL(file);
  }



  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  //USED FOR IMAGE UPLOAD (base64)

  openVerificationDialog(){
    if(!this.isVerified){
      const email = this.currentAccount?.email!;
      this.emailService.addTwoStepCode(email).subscribe();
      this.dialog.open(VerificationComponent,  {
        height: '450px',
        width: '600px',
        data: { email: email }
      });
    }
  }

  openPasswordChange(){
    if(this.isVerified){
      const email = this.currentAccount?.email!;
      this.dialog.open(RecoverPasswordComponent,  {
        height: '450px',
        width: '600px',
        data: { email: email }
      });
    } else{
      this.message = "*პაროლის შესაცვლელად გაიარეთ ვერიფიკაცია"
    }
    
  }


}
