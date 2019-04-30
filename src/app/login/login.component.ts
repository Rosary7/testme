import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public submitMessage: string;
    constructor(private authService : AuthenticationService, private routerService : RouterService) { 
    }
    username = new FormControl('',[Validators.required]);
    password = new FormControl('',[Validators.required]);
    
    loginSubmit() {
      var logindata = {'userId': this.username.value, 'userPassword': this.password.value};
      this.authService.authenticateUser(logindata).subscribe(data=>{
        this.authService.setBearerToken(data["token"]);
        console.log('data',data);
        this.authService.setUser(this.username.value);
        this.routerService.routeToDashboard();
      },
      error=>{
        this.authService.setBearerToken(null);
        if(error.status === 401) {
          error.error.message =  'Unauthorized';
          this.submitMessage=error.error.message;
        }
        if(error.status === 404) {
          //error.error.message =  'Unauthorized';
          this.submitMessage=error.message;
        }        
      }
      )      
    }
    register() {
      this.routerService.routeToRegister();

    }
}
