import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-doctors-crud',
  templateUrl: './doctors-crud.component.html',
  styleUrls: ['./doctors-crud.component.css']
})
export class DoctorsCRUDComponent {
  constructor(public accountService: AccountService){
 
  }

  doctors : Account[] | null = null;

  ngOnInit():void{
    this.accountService.getDoctors().subscribe((accounts: Account[]) => {
      this.doctors = accounts; 
    });
  }

  deleteAccount(firstname: string | null, lastname : string | null){
    const deletedAccount=this.doctors?.find(doctor =>
      doctor.firstname === firstname && doctor.lastname === lastname
      );
      if(deletedAccount && deletedAccount.email){
        this.accountService.deleteAccount(deletedAccount.email);
        window.location.href = '';
      }
  }

 
}
