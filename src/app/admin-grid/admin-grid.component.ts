import { Component } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { PidDialogComponent } from '../edit-dialogs/pid-dialog/pid-dialog.component';


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

    openDialog(){
      this.dialog.open(EditDialogComponent,  {
        height: '350px',
        width: '500px',
      });
    }

    openPidDialog(){
      this.dialog.open(PidDialogComponent,  {
        data: { oldPid: this.gridAccount?.pid },
        height: '350px',
        width: '500px',
      });
    }

    openCategoryDialog(){
      
    }
}
  
