import { Component } from '@angular/core';
import { Account } from 'src/app/account';
import { SearchService } from 'src/app/search.service';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';

  constructor(
    private searchService: SearchService,
    public accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  search() {
    const nameInput = document.getElementById('nameInput') as HTMLInputElement;
    const specialityInput = document.getElementById('specialityInput') as HTMLInputElement;

    const queryParams: { [key: string]: string } = {};

    queryParams['name'] = nameInput.value.trim();
    queryParams['speciality'] = specialityInput.value.trim();

    // Clear the input fields
    nameInput.value = '';
    specialityInput.value = '';

    // Update the URL with the query parameters
    this.router.navigate([''], { queryParams, queryParamsHandling: 'merge' });
  }
}
