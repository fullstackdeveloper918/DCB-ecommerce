import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Firebase } from '../../../core/services/firebase';
import { UserService } from '../../../core/services/user.service';
import { Navbar } from "../../../shared/navbar/navbar";

@Component({
  selector: 'app-login',
  imports: [SharedModule, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginForm: FormGroup;
accountFirebase : string = 'diary'
showPassword: boolean = false;


  constructor(
  private fb: FormBuilder, 
  private router: Router,
  private firebaseService : Firebase,
  private userService : UserService,
  public firebaseAuth : AngularFireAuth) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() :any {
    console.log('this is working')
    // Mark all fields as touched to show validation errors
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    if (this.loginForm.valid) {
    return this.firebaseAuth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)
    .then((result) => {
      console.log(result);
      this.firebaseAuth.authState.subscribe((user) => {
        console.log('user', user)
        if (user) {

          user.getIdTokenResult()
          .then( idTokenResult => {            
           if (idTokenResult.claims) {              
    if (idTokenResult.claims['user_id']) {
    this.firebaseService.getFBUser(idTokenResult.claims['user_id']).subscribe((data:any) => {
      console.log('data', data);

      if (data?.userAccounts?.includes(this.accountFirebase)) {
        console.log('User account exists:', data.userAccounts);
        localStorage.setItem('firstUserRole', JSON.stringify(idTokenResult.claims['userRole']));
        localStorage.setItem('currentUser', JSON.stringify(idTokenResult.claims));

        let currentUserData :any = localStorage.getItem("currentUser");
        currentUserData = currentUserData ? JSON.parse(currentUserData) : [];

        currentUserData['validAccount'] = true;

        localStorage.setItem("currentUser", JSON.stringify(currentUserData));
        this.userService.setUser(currentUserData);
        this.doClaimsNavigation();
      } else {
        this.router.navigate(['/pages/login']);
        alert('You are not registered as a user on this account');
      }
    });
  }
}
  else{
                localStorage.setItem('currentUser', 'null');
                JSON.parse(localStorage.getItem('currentUser')!);
                this.router.navigate(['/pages/login']);
              }

            });

        }
      });

    })
    .catch((error) => {

      window.alert(error.message);
    });
  }
}

 doClaimsNavigation() {
  this.router.navigate(['/home'])
  setTimeout(() => {
    window.location.reload();
  }, 0);
}
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

markTouched(fieldName: string): void {
  const control = this.loginForm.get(fieldName);
  control?.markAsTouched();
}

getFieldError(fieldName: string): string {
  const field = this.loginForm.get(fieldName);
  if (field?.hasError('required') && field?.touched) {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }
  if (field?.hasError('email') && field?.touched) {
    return 'Please enter a valid email address';
  }
  return '';
}

isFieldInvalid(fieldName: string): boolean {
  const field = this.loginForm.get(fieldName);
  return !!(field && field.invalid && field.touched);
}
}
