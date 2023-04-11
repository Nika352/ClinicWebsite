import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-angular-project';

  constructor(public dialog: MatDialog) {}

  
  

}
