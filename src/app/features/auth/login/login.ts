import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Firebase } from '../../../core/services/firebase';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
loginForm: FormGroup;
accountFirebase : string = 'diary'

  constructor(
  private fb: FormBuilder, 
  private authService: Auth, 
  private router: Router,
  private firebaseService : Firebase,
  public firebaseAuth : AngularFireAuth) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() :any {
    if (this.loginForm.valid) {
       return this.firebaseAuth.signInWithEmailAndPassword(this.loginForm.value.email,this.loginForm.value.password)
    .then((result) => {
      console.log(result);
      this.firebaseAuth.authState.subscribe((user) => {
        console.log('user', user)
        if (user) {

          user.getIdTokenResult()
          .then( idTokenResult => {            
            if(idTokenResult.claims){              
              if(idTokenResult.claims?.['user_id']){
                this.firebaseService.getFBUser(idTokenResult.claims?.['user_id']).subscribe((data:any) => {
                  console.log('data', data);

                  if (data?.userAccounts?.includes(this.accountFirebase)) {
                    console.log('User account exists:', data.userAccounts);
                    localStorage.setItem('firstUserRole', JSON.stringify(idTokenResult.claims?.['userRole']))
                    localStorage.setItem('currentUser', JSON.stringify(idTokenResult.claims));
                
                    let currentUserData :any = localStorage.getItem("currentUser");
                    currentUserData = currentUserData ? JSON.parse(currentUserData) : [];
                
                    console.log(currentUserData);
                
                    currentUserData['validAccount'] = true;

                    console.log(currentUserData);
                
                    localStorage.setItem("currentUser", JSON.stringify(currentUserData));
                
                    this.doClaimsNavigation();
                  } else{
                    this.router.navigate(['/pages/login']);
                    alert('You are not registered as a user on this account');
                  }
                });
                
              }

              
            }else{
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

  }
}
