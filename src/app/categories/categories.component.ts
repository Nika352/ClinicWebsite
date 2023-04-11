import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  selectedCategory: string | null = null;
  doctors: Account[] | null = null;
  categories: string[] = [];

  constructor(public accountService: AccountService, private router: Router) {}

  categoryCount: { name: string, number: number }[] = [];



  ngOnInit() {
    this.accountService.getDoctors().subscribe((accounts: Account[]) => {
      this.doctors = accounts;
      for (let doctor of this.doctors) {
        if (doctor.category !== null && !this.categories.includes(doctor.category)) {
          this.categories.push(doctor.category);
        }
      }
      for(let category of this.categories){
        let number = this.getCategoryNumber(category);
        this.categoryCount.push({ name: category, number: number});
      }
      
    });
  }

  getPropertyValue(category: string): any {
    const matchedObject = this.categoryCount.find(item => item.name === category);
    return matchedObject ? matchedObject.number : 0;
  }

  getCategoryNumber(category: string) : number{
    let result = 0;
    if(!this.doctors){
      return 0;
    }
    for(let doctor of this.doctors){
      if(category === doctor.category){
        result++;
      }
    }
    return result;
  }

  categoryClicked(category: string) {
    this.selectedCategory = category;
    this.router.navigate([category]);
  }

  doctorsInCategory(category: string) {
    let result = 0;
    if (this.doctors) {
      for (let doctor of this.doctors) {
        if (doctor.category === category) {
          result++;
        }
      }
    }
    return result;
  }
}