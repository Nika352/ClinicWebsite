import { Component, Input } from '@angular/core';
import { Doctor } from '../doctor';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent {
  constructor(){
    
    }

  
  
  

  @Input() doctor!:Account;
  
  ngOnInit():void{
    
  }



  
}
