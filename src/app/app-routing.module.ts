import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DoctorsCRUDComponent } from './doctors-crud/doctors-crud.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { Account } from './account';
import { AccountService } from './account.service';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'doctors-crud', component: DoctorsCRUDComponent },
  { path: 'admin', component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  doctors: Account[] | null = null;
  categories: string[] = [];

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.getDoctors().subscribe((accounts: Account[]) => {
      this.doctors = accounts;
     
      this.categories = this.extractCategories(this.doctors);
      
      this.generateRoutesAndResetConfig();
    });
  }

  private extractCategories(doctors: Account[]): string[] {
    const categories = new Set<string>();
    for (const doctor of doctors) {
      if (doctor.category !== null) {
        categories.add(doctor.category);
      }
    }
    
    return Array.from(categories);
  }

  private generateRoutesAndResetConfig() {
    const routesWithCategories: Routes = [
      ...routes,
      ...this.generateCategoryRoutes(),
    ];
    this.router.resetConfig(routesWithCategories);
  }

  private generateCategoryRoutes(): Routes {
    const categoryRoutes: Routes = [];
    for (const category of this.categories) {
      const route = {
        path: category,
        component: HomePageComponent,
        data: { category },
      };
      categoryRoutes.push(route);
    }
    return categoryRoutes;
  }
}