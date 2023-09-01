import { Component } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PidDialogComponent } from '../edit-dialogs/pid-dialog/pid-dialog.component';
import { CategoryDialogComponent } from '../edit-dialogs/category-dialog/category-dialog.component';
import { EmailDialogComponent } from '../edit-dialogs/email-dialog/email-dialog.component';
import { PasswordDialogComponent } from '../edit-dialogs/password-dialog/password-dialog.component';
import { VerificationComponent } from '../verification/verification.component';


@Component({
  selector: 'app-admin-grid',
  templateUrl: './admin-grid.component.html',
  styleUrls: ['./admin-grid.component.css']
})
export class AdminGridComponent {

  constructor(private route: ActivatedRoute, public accountService: AccountService, public dialog: MatDialog) { }

  gridAccount: Account | null = null;

  isDoctor = false;

  doctors: Account[] | null = null;

  ngOnInit() {
    const accountString = localStorage.getItem('currentAccount');

    this.accountService.getDoctors().subscribe((accounts: Account[]) => {
      this.doctors = accounts;

      this.route.queryParams.subscribe(params => {
        const doctorEmail = params['doctorEmail'];
        const doctor = this.doctors?.find(d => d.email === doctorEmail);
        console.log('Doctor:', doctor);
        if (doctor != undefined) {
          this.isDoctor = true;
          this.gridAccount = doctor;
        } else if (accountString) {
          this.isDoctor = false;
          this.gridAccount = JSON.parse(accountString) as Account;
        }

      });
    });
  }

  
  logOut(){   
    localStorage.clear();
    window.location.href = "";
}



openPidDialog(){
  this.dialog.open(PidDialogComponent,  {
    data: { email: this.gridAccount?.email, oldPid: this.gridAccount?.pid },
    height: '350px',
    width: '500px',
  });
}

openCategoryDialog(){
  this.dialog.open(CategoryDialogComponent,  {
    data: { email: this.gridAccount?.email, oldCategory: this.gridAccount?.category },
    height: '350px',
    width: '500px',
  });
}

openEmailDialog(){
  this.dialog.open(EmailDialogComponent,  {
    data: { oldEmail: this.gridAccount?.email },
    height: '350px',
    width: '500px',
  });
}

openPasswordDialog(){
  this.dialog.open(PasswordDialogComponent,  {
    data: { email: this.gridAccount?.email, oldPassword: this.gridAccount?.password },
    height: '350px',
    width: '500px',
  });
}

changeStars(num : number){

  const email = this.gridAccount?.email;
  if(email)
  this.accountService.changeStars(email, num).subscribe(
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

    //USED FOR IMAGE UPLOAD (base64)
    imageData:any = '';
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const imageUrl: string | ArrayBuffer | null = e.target?.result ?? null;
  
        if (this.isImageFile(file)) {
         
          this.imageData = imageUrl;
          const storedAccount = JSON.stringify(this.gridAccount);
          const currentAccount = storedAccount ? JSON.parse(storedAccount) : null;
          
          this.accountService.setImage(currentAccount.email, this.imageData).subscribe((updatedAccount: Account | null)=>{
           
            this.gridAccount = updatedAccount;
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

    onDownloadCv(){
      const cv = this.gridAccount?.cv;
      if (cv) {
        this.downloadPDF(cv, 'cv');
      } else {
        // Handle the case when cv is not available
        // For example, display an error message or take alternative action
        console.error('CV is not available');
      }
    }

    downloadPDF(base64String: string, fileName: string) {
      base64String = base64String.replace("data:application/pdf;base64,", ""); // Assign the replaced value back to base64String

      // Convert the base64 string to bytes
      const byteCharacters = atob(base64String);
      // Convert the byte array to ArrayBuffer
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const arrayBuffer = byteArray.buffer;
    
      // Create a Blob from the ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
      // Generate a temporary URL for the Blob
      const url = window.URL.createObjectURL(blob);
    
      // Create a temporary anchor tag to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
    
      // Clean up the temporary URL and anchor tag
      window.URL.revokeObjectURL(url);
      link.remove();
    }
    

    deleteAccount(email : string | null){
      if(email){
        this.accountService.deleteAccount(email);
      }
      
    }
   

}
  
