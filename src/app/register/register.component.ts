import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  accountType = "User";

  adminRegister = false;

  isDoctor = false;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute, private emailService: EmailService) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (localStorage.getItem("currentAccount")) {
        this.adminRegister = true;
      }
      const accountType = params['accountType'];
      this.accountType = accountType;
      this.isDoctor = this.accountType === 'Doctor';
      if (localStorage.getItem('currentAccount')) {
        if (!this.isDoctor) {
          this.registerForm.get('category')?.disable();
          this.registerForm.get('cv')?.disable();
          this.registerForm.get('profile')?.disable();
          this.registerForm.get('activationCode')?.disable();
        } else if (this.isDoctor) {
          this.registerForm.get('activationCode')?.disable();
        }
      }
      else {
        this.accountType = "User";
        this.registerForm.get('category')?.disable();
        this.registerForm.get('cv')?.disable();
        this.registerForm.get('profile')?.disable();
      }
    });

  }


  registerForm = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(5)]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    PID: new FormControl("", [Validators.required, Validators.min(9999999999), Validators.max(99999999999)]),
    password: new FormControl("", [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]),
    activationCode: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    profile: new FormControl("", [Validators.required]),
    cv: new FormControl("", [Validators.required])
  });


  submit() {
    if (this.registerForm.valid) {
      let account = new Account(); // create a new User object
      account.firstname = this.registerForm.get('firstname')!.value;
      account.lastname = this.registerForm.get('lastname')!.value;
      account.email = this.registerForm.get('email')!.value;
      account.password = this.registerForm.get('password')!.value;
      account.pid = this.registerForm.get('PID')!.value?.toString();
      account.img = "";
      account.category = "";
      account.cv = "";
      account.stars = 1;
      account.accountType = this.accountType;
      if (this.isDoctor) {
        account.img = this.imageData;
        account.category = this.registerForm.get('category')!.value;
        account.cv = this.pdfData;
        const jsonString: string = JSON.stringify(account);
        this.accountService.putAccountInDb(account).subscribe();
        if (!localStorage.getItem('currentAccount')) {
          localStorage.setItem('currentAccount', JSON.stringify(account));
        }
        window.location.href = '';
      } else {

        const code = this.registerForm.get('activationCode')!.value!;
        console.log(code);

        this.emailService.checkCode(account.email!, code).subscribe(
          codeCheck => {
            if(codeCheck){
              const jsonString: string = JSON.stringify(account);
              this.accountService.putAccountInDb(account).subscribe();
              if (!localStorage.getItem('currentAccount')) {
                localStorage.setItem('currentAccount', JSON.stringify(account));
              }
              window.location.href = '';
            } else {

            }
            
          },
          error => {
            if(localStorage.getItem("currentAccount")){
              const jsonString: string = JSON.stringify(account);
              this.accountService.putAccountInDb(account).subscribe();
              if (!localStorage.getItem('currentAccount')) {
                localStorage.setItem('currentAccount', JSON.stringify(account));
              }
              window.location.href = '';
            } else{
              console.log("code is false or other type of error occured")
            }
          }

        );
      }



    }


  }


  get FirstName(): FormControl {
    return this.registerForm.get("firstname") as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get("lastname") as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get("email") as FormControl;
  }
  get Pid(): FormControl {
    return this.registerForm.get("PID") as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }
  get Category(): FormControl {
    return this.registerForm.get("category") as FormControl;
  }
  get Profile(): FormControl {
    return this.registerForm.get("profile") as FormControl;
  }
  get Cv(): FormControl {
    return this.registerForm.get("cv") as FormControl;
  }



  sendMail(email: string) {
    console.log(email);
    this.emailService.addCode(email).subscribe(
      response => {
        console.log('Response from API:', response);
        // Handle any actions after successful response
      },
      error => {
        console.error('Error:', error);
        // Handle error cases if needed
      }
    );
  }



  //USED FOR IMAGE UPLOAD (base64)
  imageData: any = '';
  onImgSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl: string | ArrayBuffer | null = e.target?.result ?? null;

      if (this.isImageFile(file)) {
        this.imageData = imageUrl;
      }
    };

    reader.readAsDataURL(file);
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  //USED FOR IMAGE UPLOAD (base64)



  //USED FOR PDF UPLOAD
  pdfData: any = '';

  onCvSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const pdfContent: string | ArrayBuffer | null = e.target?.result ?? null;

      if (this.isPdfFile(file)) {
        this.pdfData = pdfContent;
      }
    };

    reader.readAsDataURL(file);
  }

  isPdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }
  //USED FOR PDF UPLOAD



}
