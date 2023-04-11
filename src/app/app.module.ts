import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesComponent } from './categories/categories.component';
import { DoctorCardComponent } from './doctor-card/doctor-card.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ForPracticeComponent } from './for-practice/for-practice.component';
import { DoctorsCRUDComponent } from './doctors-crud/doctors-crud.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminGridComponent } from './admin-grid/admin-grid.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { CategoryDialogComponent } from './edit-dialogs/category-dialog/category-dialog.component';
import { PidDialogComponent } from './edit-dialogs/pid-dialog/pid-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    RegisterComponent,
    HomePageComponent,
    SliderComponent,
    CategoriesComponent,
    DoctorCardComponent,
    LoginComponent,
    UserComponent,
    UserPageComponent,
    ForPracticeComponent,
    DoctorsCRUDComponent,
    AdminPageComponent,
    AdminHeaderComponent,
    AdminGridComponent,
    EditDialogComponent,
    CategoryDialogComponent,
    PidDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
     MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
