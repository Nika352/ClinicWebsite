import { Component } from '@angular/core';
import { Account } from 'src/app/account';
import { AccountService } from 'src/app/account.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  categoryClicked: string | null = null;
  doctors: Account[] | null = null;
  originalDoctors: Account[] | null = null;
  searchedDoctors: Account[] | null = null;

  ngOnInit(): void {
    this.accountService.getDoctors().subscribe((accounts: Account[]) => {
      this.originalDoctors = accounts;
      this.route.data.subscribe((data) => {
        const category = data['category'];
        this.categoryClicked = category;
      });
      this.route.queryParams.subscribe(params => {
        const nameQuery = params['name'];
        const specialityQuery = params['speciality'];
        if (this.originalDoctors) {
          this.searchedDoctors = this.searchService.searchDoctors(this.originalDoctors, nameQuery, specialityQuery);
          this.doctors = this.searchedDoctors;
        }
      });
    });
  }
}