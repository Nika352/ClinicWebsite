import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  currentAccount: Account | null = null;

  constructor(private accountService : AccountService){

  }

  ngOnInit(){
    const accountString = localStorage.getItem('currentAccount');
    if(accountString){
      this.currentAccount = JSON.parse(accountString) as Account;
    }

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

 


}
